(function () {
    var jquery_version = '3.3.1';
    var site_url = 'http://127.0.0.1:8000/';
    var static_url = site_url + 'static/';
    var min_width = 100;
    var min_height = 100;

    function bookmarklet(msg) {
        // Загрузка CSS-стилей
        var css = JQuery('<link>');
        css.attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: static_url + 'css/bookmarklet.css?r=' +
                Math.floor(Math.random() * 99999999999999999999)
        });
        jQuery('head').append(css);
        // загрузка HTML
        box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"</div></div>';
        jQuery('body').append(box_html);
        // Добавление скрытия букмарклета при нажатии на крестик
        jQuery('#bookmarklet #close').click(function () {
            jQuery('#bookmarklet').remove();
        });
    };

    // Проверка, подключена ли jQuery. 
    if (typeofwindow.jQuery != 'undefined') {
        bookmarklet();
    } else {
        // Проверка, что атрибут $ окна не занят другим объектом.
        var conflict = typeof window.$ != 'undefined';
        // Создание тега <script> с загрузкой jQuery.
        var script = document.createElement('script');
        script.src = '//ajax.googleapis.com/ajax/libs/jquery/' + jquery_version + '/jquery.min.js';
        // Добавление тега в блок <head> документа.
        document.head.appendChild(script);
        // Добавление возможности использовать несколько попыток для загрузки jQuery.
        var attempts = 15;
        (function () {
            // Проверка, подключена ли jQuery
            if (typeof window.jQuery == 'undefined') {
                if (--attempts > 0) {
                    // Если не подключена, пытаемся снова загрузить
                    window.setTimeout(arguments.callee, 250)
                } else {
                    // Превышено число попыток загрузки jQuery, выводим сообщение.
                    alert('An error occurred while loading jQuery')
                }
            } else {
                bookmarklet();
            }
        })();
    }
})()