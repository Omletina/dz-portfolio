(function($) {
	$('.input-dn-file').on('change', function(){
		var filename = $(this).val().split('\\').pop();
		$(this).next().find('.input-value').val(filename);
	});

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