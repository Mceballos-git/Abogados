// export class JwtInterceptor implements HttpInterceptor {
//     constructor(public auth: AuthService) {
//     }
//
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//
//         return next.handle(request).do((event: HttpEvent<any>) => {
//
//         }, (err: any) => {
//             if (err instanceof HttpErrorResponse) {
//                 if (err.status === 401) {
//                     // or show a modal
//                 }
//             }
//         });
//     }
// }