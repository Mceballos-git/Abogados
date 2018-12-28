<?php

return [
    'encoding'      => 'UTF-8',
    'finalize'      => true,
    'cachePath'     => storage_path('app/purifier'),
    'cacheFileMode' => 0755,
    'settings'      => [
        'default' => [
            'URI.DisableExternal'      => true,
            'HTML.Doctype'             => 'HTML 4.01 Transitional',
            'HTML.AllowedElements'     => ["a", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "code", "ul", "li", "ol", "img", "p", "b", "s", "em",
                                            "strong", "pre", "table", "tr", "td", "th", "thead", "tbody", "hr", "br", "span", "tt"],
            "HTML.AllowedAttributes"   => ["*.class", "img.src", "*.width", "*.height", "*.align", "a.target", "a.href", "*.style"],
            'CSS.AllowedProperties'    => 'background-color, color'
        ],
    ],
];
