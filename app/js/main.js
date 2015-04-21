$("#contactForm").validate({
	rules:{
		name:{
			required: true,
			minlength: 3
		},
		email:{
			required: true,
			email: true
		},
		message:{
			required: true,
		},
		captcha:{
			required: true,
			minlength: 6
		}
	},
	messages:{
		name:{
			required: 'Вы не ввели имя'
		},
		email:{
			required: 'Вы не ввели email',
			email: 'Не правильный email'
		},
		message:{
			required: 'Ваш вопрос'
		},
		captcha:{
			required: 'Вы не ввели код',
			minlength: "6 - символов"
		}
	},
	errorElement: 'span'
});