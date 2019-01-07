@extends('layouts.bs4_layout')

@section('title', 'Sassani-soft API Documentation')

@section('content')

    <h1 class="display-4">Api endpoints documentation</h1>
    <p> En las siguientes lineas se encontrara documentation detallada acerca de como consumir Sassani-Soft API.</p>
    <p>- Dominio por defecto Server Desarrollo: local.sassani.com</p>
    <p>- Dominio por defecto Server Produccion: ssani-soft-com (TODO: cambiar por vedadero)</p>

    <h3><u>Codigos De Estado HTTP (HTTP Status Codes):</u></h3>

    <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-item nav-link active" id="nav-ok-tab" data-toggle="tab" href="#nav-ok" role="tab"
               aria-controls="nav-ok" aria-selected="true">200</a>
            <a class="nav-item nav-link" id="nav-badRequest-tab" data-toggle="tab" href="#nav-badRequest" role="tab"
               aria-controls="nav-badRequest" aria-selected="false">400</a>
            <a class="nav-item nav-link" id="nav-unauthorized-tab" data-toggle="tab" href="#nav-unauthorized" role="tab"
               aria-controls="nav-unauthorized" aria-selected="false">401</a>
            <a class="nav-item nav-link" id="nav-forbidden-tab" data-toggle="tab" href="#nav-forbidden" role="tab"
               aria-controls="nav-forbidden" aria-selected="false">403</a>
            <a class="nav-item nav-link" id="nav-notFound-tab" data-toggle="tab" href="#nav-notFound" role="tab"
               aria-controls="nav-notFound" aria-selected="false">404</a>
            <a class="nav-item nav-link" id="nav-notAllowed-tab" data-toggle="tab" href="#nav-notAllowed" role="tab"
               aria-controls="nav-notAllowed" aria-selected="false">405</a>
            <a class="nav-item nav-link" id="nav-internalError-tab" data-toggle="tab" href="#nav-internalError"
               role="tab" aria-controls="nav-internalError" aria-selected="false">405</a>
        </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-ok" role="tabpanel" aria-labelledby="nav-ok-tab">
            <div style="padding:30px">
                <p><b>200 - Ok:</b></p>
                <p>La Peticion se proceso correctaente. </p>
            </div>
        </div>
        <div class="tab-pane fade" id="nav-badRequest" role="tabpanel" aria-labelledby="nav-badRequest-tab">
            <div style="padding:30px">
                <p><b>400 - Bad Request:</b></p>
                <p>Api retornara un error 400 cuando los datos enviados por el consumidor no sean
                    los correctos para ejecutar la accion, como ejemplo: el campo requrido "username" no se
                    encontro </p>
            </div>
        </div>
        <div class="tab-pane fade" id="nav-unauthorized" role="tabpanel" aria-labelledby="nav-unathorized-tab">
            <div style="padding:30px">
                <p><b>401 - Unauthroized:</b></p>
                <p>Api retornara un error 401 cuando el Request a ejecutar Necesita un token de
                    authenticacion y el mismo no es provisto y/o sea invalido o haya expirado. </p>
            </div>
        </div>
        <div class="tab-pane fade" id="nav-forbidden" role="tabpanel" aria-labelledby="nav-forbidden-tab">
            <div style="padding:30px">
                <p><b>403 - Forbidden: </b></p>
                <p>Api Retornara un error 403 cuando el Request a ejecutar necesita que el usuario
                    tenga ciertos privilegios (Ej: admin) y el mismo no los posea. </p>
            </div>
        </div>
        <div class="tab-pane fade" id="nav-notFound" role="tabpanel" aria-labelledby="nav-notFound-tab">
            <div style="padding:30px">
                <p><b>404 - Not Found:</b></p>
                <p>Api retornara un error 404 cuando la routa que se intenta acceder no exista.</p>
            </div>
        </div>
        <div class="tab-pane fade" id="nav-notAllowed" role="tabpanel" aria-labelledby="nav-notAllowed-tab">
            <div style="padding:30px">
                <p><b>405 - Method not allowed:</b></p>
                <p>El metodo HTTP utilizado en la peticion no es admitido.</p>
            </div>
        </div>
        <div class="tab-pane fade" id="nav-internalError" role="tabpanel" aria-labelledby="nav-internalError-tab">
            <div style="padding:30px">
                <p><b>500 - Internal Error</b></p>
                <p>Api Retornara un error 500 cuando se detecte un error interno de codigo en el
                    servidor y el request no se pueda procesar correctamnete.</p>
            </div>
        </div>
    </div>

    @foreach ($endpoints as $endpointModule => $moduleEndpoints)
        <div style="margin-top:30px;">
            <h2><u>{{$endpointModule}}</u></h2>
        </div>
        <div class="accordion" id="accordionExample">

            @php $i = 0; @endphp
            @foreach ($moduleEndpoints as $index => $route)
                @php $endpoint = $route->endpoint === '/' ? '' : $route->endpoint; @endphp
                @php $show = ($i === 0) ? "show" : ""; @endphp
                <div class="card">
                    <div class="card-header" id="{{strtolower($endpointModule)}}-{{$route->identifier}}">
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                    data-target="#collapse-{{strtolower($endpointModule)}}-{{$route->identifier}}"
                                    aria-controls="collapse-{{strtolower($endpointModule)}}-{{$route->identifier}}">
                                {{ucfirst($route->identifier)}}
                            </button>
                        </h2>
                    </div>

                    <div id="collapse-{{strtolower($endpointModule)}}-{{$route->identifier}}" class="collapse {{$show}}"
                         aria-labelledby="{{strtolower($endpointModule)}}-{{$route->identifier}}"
                         data-parent="#accordionExample">
                        <div class="card-body">
                            <h3> {{ucfirst($route->identifier)}} </h3>
                            @if(isset($route->description))
                                <p> {{$route->description}} </p>
                            @endif
                            <p>
                                <b>Endpoint Url:</b>
                                http://local.sassani.com/{{strtolower($endpointModule)}}{{$endpoint}}
                            </p>
                            <p><b>Methodo De Request:</b> {{$route->requestType}}</p>
                            <p>
                                <b>Detalles De Dessarrollo:</b> Esta ruta ejecuta el metodo: <b>{{$route->action}}</b>
                                del
                                controlador <b>{{$route->controller}}</b>
                            </p>


                            @if(isset($route->authorizationMiddleare) && $route->authorizationMiddleware === 'true')
                                <p> Este Request Requiere un header de Authenticacion como se indica a continuacion </p>
                                <pre> { Authorization: Bearer {token} } </pre>
                            @endif

                            @if(isset($route->roles))
                                <p><b>Roles Que pueden ejecutar esta accion: </b> {{implode(',', $route->roles)}}</p>
                            @endif

                            @if(isset($route->validationRules))
                                <p> Detalles de la informacion Requida para Ejecutar este request </p>
                                <pre>{{json_encode($route->validationRules, JSON_PRETTY_PRINT)}}</pre>
                            @endif

                            @if(isset($route->requestExample))
                                <p><b>Request Example</b></p>
                                <pre>{{json_encode($route->requestExample, JSON_PRETTY_PRINT)}}</pre>
                            @endif

                            @if(isset($route->responseExample))
                                <p><b>Request Example</b></p>
                                <pre>{{json_encode($route->responseExample, JSON_PRETTY_PRINT)}}</pre>
                            @endif

                        </div>
                    </div>
                </div>



                {{--@if($route->autoria)--}}



                {{--<div>--}}
                {{--<h5><b>Request Example:</b></h5>--}}
                {{--<p>Request Headers:</p>--}}
                {{--<pre>{{json_encode($route->documentationData->headers, JSON_PRETTY_PRINT)}}</pre>--}}
                {{--<p>Request Body:</p>--}}
                {{--<pre>{{json_encode($route->documentationData->requestBodyExample, JSON_PRETTY_PRINT)}}</pre>--}}
                {{--</div>--}}
                {{--<div>--}}
                {{--<h5><b>Response Example:</b></h5>--}}
                {{--<pre>{{json_encode($route->documentationData->responseExample, JSON_PRETTY_PRINT)}}</pre>--}}

                {{--</div>--}}
                @php $i = $i+1; @endphp
            @endforeach
        </div>

    @endforeach

@endsection