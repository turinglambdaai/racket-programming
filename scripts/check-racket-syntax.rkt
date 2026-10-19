#lang racket/base

(require racket/file
         racket/list
         racket/path
         racket/port
         racket/string)

(define root (build-path (current-directory) "content"))

(define (content-file? p)
  (and (file-exists? p)
       (regexp-match? #rx"[.]mdx?$" (path->string p))))

(define (racket-fence? line)
  (regexp-match? #px"^\\s*```racket(?:\\s|$)" line))

(define (closing-fence? line)
  (regexp-match? #px"^\\s*```\\s*$" line))

(define total 0)
(define failures '())

(define (check-block file block-index source)
  (set! total (add1 total))
  (with-handlers ([exn:fail:read?
                   (lambda (e)
                     (set! failures
                           (cons (format "~a block ~a: ~a"
                                         (path->string (find-relative-path (current-directory) file))
                                         block-index
                                         (exn-message e))
                                 failures)))])
    (define in (open-input-string source))
    (port-count-lines! in)
    (parameterize ([read-accept-reader #t])
      (let loop ()
        (define v (read-syntax (path->string file) in))
        (unless (eof-object? v)
          (loop))))))

(for ([file (in-directory root)]
      #:when (content-file? file))
  (define lines (file->lines file))
  (define inside? #f)
  (define block-lines '())
  (define block-index 0)

  (for ([line (in-list lines)])
    (cond
      [(and (not inside?) (racket-fence? line))
       (set! inside? #t)
       (set! block-lines '())
       (set! block-index (add1 block-index))]
      [(and inside? (closing-fence? line))
       (set! inside? #f)
       (check-block file block-index (string-join (reverse block-lines) "\n"))
       (set! block-lines '())]
      [inside?
       (set! block-lines (cons line block-lines))]
      [else (void)]))

  (when inside?
    (set! failures
          (cons (format "~a block ~a: unclosed racket code fence"
                        (path->string (find-relative-path (current-directory) file))
                        block-index)
                failures))))

(cond
  [(null? failures)
   (printf "[racket-syntax] OK: parsed ~a racket code blocks with Racket's reader.\n" total)]
  [else
   (eprintf "[racket-syntax] FAILED: ~a problem(s) across ~a racket code blocks:\n"
            (length failures) total)
   (for ([f (in-list (reverse failures))])
     (eprintf "  - ~a\n" f))
   (exit 1)])
