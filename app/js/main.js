$(function() {

    var app = {

        initialize: function() {
            console.log('Инициализация модуля app');
            this._modules();
            this._setUpListners();
        },

        _modules: function() {

        },

        // Подключаем прослушку событий
        _setUpListners: function() {
            $('form').on('submit', app._submitForm); // Отправка формы
            $('form').on('keydown', 'input, textarea', app._removeError);
            $('form').on('reset', app._removeReset);

            $('.input-dn-file').on('change', app._imgValue);
            $('.input-dn-file').on('change', app._removeErrorFile);


        },

        _imgValue: function() {
            var filename = $(this).val().split('\\').pop();
            $(this).next().find('.input-value').val(filename);
        },

        // Обработка сабмита формы
        _submitForm: function(e) {
            console.log('Работа с формой связи');
            e.preventDefault();

            var form = $(this);
             //   url = '/ajax.php',
             //   defObject = app._ajaxForm(form, url);

            if(app._validateForm(form) === false) return false;

            console.log('ajax start');

        /*    if (defObject) {
                defObject.done(function(ans){
                    console.log(ans);
                    // var mes = ans.mes,
                    //     status = ans.status;

                    // if ( status === 'OK') {
                    //     form.trigger('reset');
                    //     form.find('.success-mes').text(mes).show();
                    // } else{
                    //     form.find('.error-mes').text(mes).show();
                    // }
                });
            }
		*/
        },

        _validateForm: function(form) {
            var inputs = form.find('input, textarea').not('input[type="file"]'),
                valid = true;

            $.each(inputs, function(index, val) {
                var input = $(val),
                        val = input.val(),
                        formGroup = input.parents('.input-bl');

                if(val.length === 0) {
                    formGroup.addClass('error');
                    valid = false;
                } else {
                    formGroup.removeClass('error');
                }

            });

            return valid;
        },

        _removeError: function() {
            $(this).parent().removeClass('error');
        },

        _removeErrorFile: function() {
            $(this).parents('.input-bl').removeClass('error');
        },
        _removeReset: function() {
            var inputs = $(this).find('input, textarea').not('input[type="file"]');
            inputs.parent().removeClass('error');
        },

        // Универсальныя функция ajax
/*        _ajaxForm: function(form, url){
            var data = form.serialize(), // собираем данные из формы в объект date
                defObj = $.ajax({ // Возвращает Deferred Object
                    type: 'POST',
                    url: url,
                    dataType: 'JSON',
                    data: data
                }).fail(function(ans){
                    console.log('Проблемы в PHP');
                    //form.find('.error-mes').text('На сервере произошла ошибка').show();
                });
             return defObj;
         }
*/

    };

    app.initialize();

});



$(function() {

    var popLink = $('.soother'),
        overflowBl = $('#overflowBl'),
        modalBl = $('#modalBl'),
        closeBtn = $('.close-btn'),
        popapForm = {

        init: function() {
            console.log('Инициализация модуля popapForm');
            this._setUpListners();
        },

        // Подключаем прослушку событий
        _setUpListners: function() {
            popLink.on('click', popapForm._popapClick);
            closeBtn.on('click', popapForm._popapClose);
            closeBtn.on('click', popapForm._removeReset);
            overflowBl.on('click', popapForm._popapCloseO);
            overflowBl.on('click', popapForm._removeReset);
        },

         _popapClick: function(){
            var heightModal,
                widthModal;

            overflowBl.fadeIn(300);
            modalBl.fadeIn(300);
            heightModal =  $('#modalBl').height();
            widthModal = $('#modalBl').width();
            modalBl.css({"margin-left":-(widthModal/2),"margin-top":-(heightModal/2)});
        },

        _popapClose: function(){
            overflowBl.fadeOut(300);
            modalBl.fadeOut(300);
        },

        _popapCloseO: function(){
            overflowBl.fadeOut(300);
            modalBl.fadeOut(300);
        },

        _removeReset: function() {
            var inputs = modalBl.find('input, textarea');
            console.log(inputs);
            inputs.parents('.input-bl').removeClass('error');
            $('#projectAdd').trigger( 'reset' );
        },

    };

    popapForm.init();

});


(function($) {
    if($('input').length) {
        $('input, textarea').placeholder();
    }
})(jQuery);