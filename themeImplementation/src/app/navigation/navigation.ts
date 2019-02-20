import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Secciones',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
            
                id       : 'dashboard',
                title    : 'Menú Principal',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'home',
                url     : '/dashboard'
                 
            },//dashboard
            {
            
                id       : 'clients',
                title    : 'Clientes',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'collapsable',
                icon     : 'people',
                children : [{
                    id       : 'clients-list',
                    title    : 'Listado de clientes',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/clients/list',                    
                },
                {
                    id       : 'clients-create',
                    title    : 'Nuevo Cliente',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/clients/create',                    
                }]                
            },//clients
            {
                id       : 'movements',
                title    : 'Caja',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'collapsable',
                icon     : 'monetization_on',
                children : [{
                    id       : 'movements-list',
                    title    : 'Listado de movimientos',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/movements/list',                    
                },
                {
                    id       : 'movements-create',
                    title    : 'Nuevo movimiento',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/movements/create',                    
                }
            ]},//movements
            {
                id       : 'movements-cat',
                title    : 'Rubros de caja',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'collapsable',
                icon     : 'list',
                children : [{
                    id       : 'movements-cat-list',
                    title    : 'Listado de rubros',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/movements-categories/list',                    
                },
                {
                    id       : 'movements-cat-create',
                    title    : 'Nuevo rubro',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/movements-categories/create',                    
                }]                
            },//movements -categories
            {
                id       : 'operators',
                title    : 'Operadores',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'collapsable',
                icon     : 'people_outline',
                children : [{
                    id       : 'operators-list',
                    title    : 'Listado de operadores',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/users/list',                    
                },
                {
                    id       : 'operators-create',
                    title    : 'Nuevo operador',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/users/create',                    
                }]                
            },//operators
            {
                id       : 'turns',
                title    : 'Turnos',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'collapsable',
                icon     : 'calendar_today',
                children : [
                {
                    id       : 'turns-create',
                    title    : 'Calendario',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/calendar',                    
                }]                
            },//turns
            {
                id       : 'procedure-cat',
                title    : 'Trámites (categorías)',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'collapsable',
                icon     : 'list',
                children : [{
                    id       : 'procedure-cat-list',
                    title    : 'Listado de categorías de trámites',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/procedure-categories/list',                    
                },
                {
                    id       : 'procedure-cat-create',
                    title    : 'Nueva categoría de trámite',
                    translate: 'NAV.SAMPLE.TITLE',
                    type     : 'item',                    
                    url      : '/procedure-categories/create',                    
                }]                
            },//procedure-categories
                      
        ]
        

    }
];
