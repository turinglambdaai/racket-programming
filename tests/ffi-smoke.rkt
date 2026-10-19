#lang racket/base

(require rackunit
         ffi/unsafe)

;; Raw allocation is outside Racket's GC and must be released explicitly.
(define raw (malloc 'raw 16))
(ptr-set! raw _int32 0 42)
(check-equal? (ptr-ref raw _int32 0) 42)
(free raw)

;; GC-managed allocation must not be passed to free.
(define managed (malloc 'atomic 16))
(ptr-set! managed _uint8 0 7)
(check-equal? (ptr-ref managed _uint8 0) 7)

(displayln "[ffi-smoke] OK")
