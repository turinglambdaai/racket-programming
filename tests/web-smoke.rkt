#lang racket

(require rackunit
         net/url
         web-server/http)

(define hello-response
  (response/xexpr
   '(html
     (body
      (p "Hello, Racket Web Server!")))))

(check-true (response? hello-response))
(check-equal? (response-code hello-response) 200)

(define u (string->url "http://localhost:8000/hello?name=Racket"))
(define path
  (filter (lambda (segment) (not (string=? segment "")))
          (map path/param-path (url-path u))))
(check-equal? path '("hello"))

(define name-entry (assq 'name (url-query u)))
(check-equal? (cdr name-entry) "Racket")

(define not-found
  (response/xexpr '(html (body (p "Not Found"))) #:code 404))
(check-equal? (response-code not-found) 404)

(displayln "[web-smoke] OK")
