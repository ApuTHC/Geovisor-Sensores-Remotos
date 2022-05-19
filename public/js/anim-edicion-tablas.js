
var notice = function(content, opts) {

		opts = $.extend(true, {

			type: 'primary',
			position: 'topcenter',
			appendType: 'append', 
			closeBtn: false,
			autoClose: 1000,
			className: '',

		}, opts);

		let $container = $('#alert-container-' + opts.position);
		if (!$container.length) {
			$container = $('<div id="alert-container-' + opts.position + '" class="alert-container" style="z-index:9999;"></div>');
			$('body').append($container);
		}

		let $el = $(`
			<div class="alert fade alert-${opts.type}" role="alert">${content}</div>
		`);

		if (opts.autoClose) {
			$el
				.append(`
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				`)
				.addClass('alert-dismissible');
		}

		if (opts.autoClose) {

			let t = setTimeout(() => {
				$el.alert('close');
			}, opts.autoClose);

		}

		opts.appendType === 'append' ? $container.append($el) : $container.prepend($el);

		setTimeout(() => {
			$el.addClass('show');
		}, 50);

		return;

	};


