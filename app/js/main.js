(function($) {
	
    if($('input').length) {
        $('input, textarea').placeholder();
    }

   $('.soother').on('click', function(){
      $('#overflowBl').fadeIn(300);
      $('#modalBl').fadeIn(300);
      var heightModal =  $('#modalBl').height();
      var widthModal = $('#modalBl').width();
      $('#modalBl').css({"margin-left":-(widthModal/2),"margin-top":-(heightModal/2)});
   });
   $('.close-btn').on('click', function(){
      $('#overflowBl').fadeOut(300);
      $('#modalBl').fadeOut(300);
   });
   $('#overflowBl').on('click', function () {
      $('#overflowBl').fadeOut(300);
      $('#modalBl').fadeOut(300);
   });

})(jQuery);

$(function() {

    var app = {

        initialize: function() {
            console.log('Инициализация модуля app');
            this._modules();
            this._setUpListners();
        },

        _modules: function() {

        },

        _setUpListners: function() {
            $('form').on('submit', app._submitForm); // Отправка формы
            $('form').on('keydown', 'input, textarea', app._removeError);
            $('form').on('reset', app._removeError);

            $('.input-dn-file').on('change', app._imgValue);
            $('.input-dn-file').on('change', app._removeErrorFile);
            
        },

        _imgValue: function() {
            var filename = $(this).val().split('\\').pop();
            $(this).next().find('.input-value').val(filename);
        },

        _submitForm: function(e) {
            console.log('Работа с формой связи');
            e.preventDefault();

            var form = $(this),
                 url = 'send_mail.php';
                // defObject = app._ajaxForm(form, url);

            if(app._validateForm(form) === false) return false;

            console.log('ajax start');
            /*
            if (defObject) {
                defObject.done(function(ans){
                    var mes = ans.mes,
                        status = ans.status;

                    if ( status === 'OK') {
                        form.trigger('reset');
                        form.find('.success-mes').text(mes).show();
                    } else{
                        form.find('.error-mes').text(mes).show();
                    }
                })
            };
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
            console.log('111');
            $(this).parents('.input-bl').removeClass('error');
        },

        /* _ajaxForm: function(form, url){
             var data = form.serialize(); // собмраем данные из формы в объект date

             return $.ajax({ // Возвращает Deferred Object
                 type: 'POST',
                 url: url,
                 dataType: 'JSON',
                 data: data
             }).fail(function(ans){
                 console.log('Проблемы в PHP');
               //  form.find('.error-mes').text('На сервере произошла ошибка').show();
             });
         }
         */

    };

    app.initialize();

});

