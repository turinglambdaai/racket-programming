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
(define skipped '())

(define (check-block file block-index source)
  (set! total (add1 total))
  (define label
    (format "~a block ~a"
            (path->string (find-relative-path (current-directory) file))
            block-index))
  (with-handlers ([exn:fail?
                   (lambda (e)
                     (define msg (exn-message e))
                     (if (and (regexp-match? #px"^\\s*#lang\\s+" (string-trim source))
                              (regexp-match? #rx"collection not found" msg))
                         (set! skipped (cons (format "~a: custom #lang is not installed in CI" label)
                                             skipped))
                         (set! failures (cons (format "~a: ~a" label msg)
                                              failures))))])
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
   (printf "[racket-syntax] OK: checked ~a racket code blocks; skipped ~a custom-#lang block(s) whose readers are intentionally not installed.\n"
           total (length skipped))
   (for ([item (in-list (reverse skipped))])
     (printf "  - skipped: ~a\n" item))]
  [else
   (eprintf "[racket-syntax] FAILED: ~a problem(s) across ~a racket code blocks:\n"
            (length failures) total)
   (for ([f (in-list (reverse failures))])
     (eprintf "  - ~a\n" f))
   (exit 1)])
