@extends('layouts.bs4_layout')

@section('title', 'Sassani-soft API Documentation')

@section('content')

    <h1 class="display-4">Api endpoints documentation</h1>
    <p> En las siguientes lineas se encontrara documentation detallada acerca de como consumir Sassani-Soft API.</p>
    <p>- Dominio por defecto Server Desarrollo: local.sassani.com</p>
    <p>- Dominio por defecto Server Produccion: ssani-soft-com (TODO: cambiar por vedadero)</p>


    <h4><u>Codigos De Respuesta:</u></h4>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="status-200-tab" data-toggle="tab" href="#status_200" role="tab" aria-controls="home" aria-selected="true">200</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="status-400-tab" data-toggle="tab" href="#status_400" role="tab" aria-controls="home" aria-selected="true">400</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="status-401-tab" data-toggle="tab" href="#status_401" role="tab" aria-controls="profile" aria-selected="false">401</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="status-403-tab" data-toggle="tab" href="#status_403" role="tab" aria-controls="contact" aria-selected="false">403</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="status-404-tab" data-toggle="tab" href="#status_404" role="tab" aria-controls="contact" aria-selected="false">403</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="status-500-tab" data-toggle="tab" href="#status_500" role="tab" aria-controls="contact" aria-selected="false">403</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent" style="min-height: 200px;">
        <div class="tab-pane fade show active" id="status_200_content" role="tabpanel" aria-labelledby="status-200-tab">H</div>
        <div class="tab-pane fade" id="status_400_content" role="tabpanel" aria-labelledby="status-400-tab">D</div>
        <div class="tab-pane fade" id="status_401_content" role="tabpanel" aria-labelledby="status-401-tab">P</div>
        <div class="tab-pane fade" id="status_402_content" role="tabpanel" aria-labelledby="status-402-tab">P</div>
        <div class="tab-pane fade" id="status_403_content" role="tabpanel" aria-labelledby="status-403-tab">P</div>
        <div class="tab-pane fade" id="status_404_content" role="tabpanel" aria-labelledby="status-404-tab">P</div>
        <div class="tab-pane fade" id="status_500_content" role="tabpanel" aria-labelledby="status-500-tab">P</div>
    </div>

    <p><b>400 - Bad Request:</b> Api retornara un error 400 cuando los datos enviados por el consumidor no sean los correctos para ejecutar la accion, como ejemplo: el campo requrido "username" no se encontro  </p>
    <p><b>401 - Unauthroized:</b> Api retornara un error 401 cuando el Request a ejecutar Necesita un token de authenticacion y el mismo no es provisto y/o sea invalido o haya expirado. </p>
    <p><b>403 - Forbidden: </b> Api Retornara un error 403 cuando el Request a ejecutar necesita que el usuario tenga ciertos privilegios (Ej: admin) y el mismo no los posea. </p>
    <p><b>404 - Not Found:</b> Api retornara un error 404 cuando la routa que se intenta acceder no exista.</p>
    <p><b>500 - Internal Error</b> Api Retornara un error 500 cuando se detecte un error interno de codigo en el servidor y el request no se pueda procesar correctamnete.</p>

    @foreach ($endpoints as $endpointModule => $moduleEndpoints)
        <h2><u>{{$endpointModule}} Endpoints:</u> </h2>

        @foreach ($moduleEndpoints as $route)
            @if(isset($route->documentationData))
                <h3> {{$route->documentationData->name}} </h3>
                <p> {{$route->documentationData->description}} </p>
                <p><b>Endpoint Url:</b> http://local.sassani.com/{{strtolower($endpointModule)}}/{{$route->endpoint}}</p>
                <p><b>Methodo De Request:</b> {{$route->requestType}}</p>

                @if(isset($route->roles))
                    <p><b>Roles Que pueden ejecutar esta accion: </b> {{implode(',', $route->roles)}}</p>7
                @endif

                <p><b>Detalles De Dessarrollo:</b> Esta ruta ejecuta el metodo: <b>{{$route->action}}</b> del controlador <b>{{$route->controller}}</b> </p>
                <div >
                    <h5><b>Request Example:</b></h5>
                    <p>Request Headers:</p>
                    <pre>{{json_encode($route->documentationData->headers, JSON_PRETTY_PRINT)}}</pre>
                    <p>Request Body:</p>
                    <pre>{{json_encode($route->documentationData->requestBodyExample, JSON_PRETTY_PRINT)}}</pre>
                </div>
                <div>
                    <h5><b>Response Example:</b></h5>
                    <pre>{{json_encode($route->documentationData->responseExample, JSON_PRETTY_PRINT)}}</pre>

                </div>
            @endif
        @endforeach
    @endforeach

@endsection