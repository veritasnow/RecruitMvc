const main = {
	menuList: null,

	init: function () {
		this.menuList = document.querySelector('#sidebar ul');
		this.loadMenu();
	},

	loadMenu: function () {
		var self = this;

		restApi.read('/menu/list', { id: 1 })
			.then(function (data) {
				self.renderMenu(data);
			})
			.catch(function (error) {
				console.error('API 요청 실패:', error);
			});
	},

	renderMenu: function (data) {
		var html = '';
		for (var i = 0; i < data.length; i++) {
			var menu = data[i];
			html += '<li data-url="' + menu.url + '" data-title="' + menu.name + '">' + menu.name + '</li>';
		}
		this.menuList.innerHTML = html;
	}
};

document.addEventListener('DOMContentLoaded', function () {
	main.init();
});