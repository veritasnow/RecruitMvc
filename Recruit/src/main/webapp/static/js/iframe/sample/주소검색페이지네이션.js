페이지네이션 공통 함수로 만들어서 쓰는게 나아보임.






		/* 페이지네이션 */
		function generatePagination(totalItems, itemsPerPage, currentPage) {
			const maxPagesToShow = 5;
			const totalPages = Math.ceil(totalItems / itemsPerPage);
			$("#pagination > a").remove();

			// 이전 페이지 그룹
			var startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
			var endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
			$("#pagination").append(formatString(pagePrev, currentPage === 1 ? '#' : formatString(funcStr, Number(currentPage - 1)), currentPage === 1 ? 'disabled' : ''));

			for(var i = startPage; i <= endPage; i++) {
				$("#pagination").append(formatString(pageStr, i, i === currentPage ? 'active' : '', i));
			}

			$("#pagination").append(formatString(pageNext, currentPage === totalPages ? '#' : formatString(funcStr, Number(currentPage + 1)), currentPage === totalPages ? 'disabled' : ''));
		}