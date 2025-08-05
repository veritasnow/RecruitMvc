창크기를 드레그를 통해 변경하는 경우 OnResize이벤트가 과도하게 발생하는 것을 시간 간격으로 -> debounce 처리하는거 그대로
getOuterHeight -> 그대로
getInnerHeight -> 그대로

replaceAll -> 그대로




// 공고 등록 모달 열기 (flatpickr 초기화 포함)
function openAnnouncementModal() {
	// flatpickr 초기화
	fnFlatPickrInit();

	// 모달 옵션 세팅 및 열기
	$('#announcementRegist').modal({
		backdrop: 'static',
		keyboard: false
	});
	$('#announcementRegist').modal('show');

	// 100ms 뒤에 창 크기 조정 이벤트 실행 (모달 렌더링 후 UI 깨짐 방지)
	return new Promise(function(resolve) {
		setTimeout(function() {
			$(window).resize();
			resolve();
		}, 100);
	});
}

// 공고 등록 모달 닫기 (flatpickr UI 제거 포함)
function closeAnnouncementModal() {
	var confirmClose = confirm("저장하지 않은 내용은 삭제됩니다.\n그래도 닫으시겠습니까?");
	if (confirmClose) {
		$('#announcementRegist').modal('hide');

		// flatpickr 달력 UI 제거 (중복 생성 방지)
		$('.flatpickr-calendar').remove();
	}
}


//날짜 Date Pickr Init Function
function fnFlatPickrInit(){

	flatpickr("[data-provider='flatpickr']", {
	    locale: {
	        firstDayOfWeek: 1, // 월요일 시작
	        weekdays: {
	            shorthand: ['일', '월', '화', '수', '목', '금', '토'], // 요일의 약자 설정
	            longhand: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'], // 요일의 풀네임 설정
	        },
	        months: {
	            shorthand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	            longhand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	        },
	    },
	    allowInput:"true"

	});

	flatpickr("[data-provider='timepickr']", {
	    enableTime: true,
	    noCalendar: true, // 달력 비활성화
	    dateFormat: "H:i",
	    time_24hr: true,
	    allowInput: true // 직접 입력 허용

	});

}










function fnTimeFormat(input) {
	// 입력값에서 ":" 제거
	const rawVal = $(input).val().replace(/:/g, '');

	// 검증
	if (!validationUtil.isValidTimeHHMM(rawVal)) {
		alert("시간 형식 오류 입니다.");
		$(input).val("");
		$(input).focus();
		return false;
	}

	// 검증 통과 시 값을 다시 세팅 (시:00 형식)
	const hh = rawVal.slice(0, 2);
	const formattedVal = hh + ":00";

	$(input).val(formattedVal);

	// flatpickr-input 클래스를 가진 형제 요소가 있으면 해당 값도 세팅
	const siblingInput = $(input).siblings().filter('.flatpickr-input').first();
	if (siblingInput.length > 0) {
		siblingInput.val(formattedVal);
	}

	return true;
}


function fnSelectBoxOption(inputId, array, allText, slecTedCode) {
	const selectElem = document.getElementById(inputId);
	if (!selectElem) return;

	// placeholder 옵션으로 allText 사용 (없으면 생략 가능)
	// slecTedCode를 defaultValue로 전달
	selectUtils.setSelect(selectElem, array, 'commCdNm', 'commCd', slecTedCode);
}



function fnClassSelectBoxOption(className, array, allText, selectedCode) {
	const selects = document.querySelectorAll('.' + className);
	if (!selects.length) return;

	selects.forEach(selectElem => {
		selectUtils.setSelect(selectElem, array, 'commCdNm', 'commCd', selectedCode, allText);
	});
}



function fnRadioLabel(containerId, array, name, selectedCode) {
	const container = document.getElementById(containerId);
	if (!container) return;

	radioUtils.setRadioGroup(container, array, name, 'commCodeNm', 'commCode', selectedCode);
}




function fnTooltip(id, html) {
  var $input = $('#' + id);

  // 툴팁 초기화 해제 후 재설정
  $input.tooltip('destroy');

  // 툴팁 상태를 저장할 커스텀 데이터
  var visible = $input.data('tooltip-visible') || false;

  $input.off('click').on('click', function () {
    visible = $input.data('tooltip-visible') || false;

    if (!visible) {
      $input.tooltip({
        content: html,
        disabled: false,
        show: null, // 기본 애니메이션 사용
        hide: {
          effect: "fadeOut",
          duration: 200
        },
        open: function (event, ui) {
          $input.data('tooltip-visible', true);
          // 툴팁 내부 클릭 시 닫히도록
          ui.tooltip.off('click').on('click', function () {
            $input.tooltip('close');
          });
        },
        close: function () {
          $input.data('tooltip-visible', false);
        }
      }).tooltip('open');
    } else {
      $input.tooltip('close');
    }
  });

  // 툴팁이 마우스 떠날 때 자동 닫힘 처리 (선택 사항)
  $input.off('mouseleave').on('mouseleave', function () {
    $input.tooltip('close');
  });
}

// 툴팁 닫기 함수
function fnTooltipClose(id) {
  var $input = $('#' + id);
  $input.tooltip('close');
  $input.data('tooltip-visible', false);
}













// 파일 명 검사 [해당 ID, 허용 파일 확장자, 파일 사이즈 체크]
function fnFleCheck(id, fileEndNm, fileSize) {
  const fileName = id.val();
  if (!fileName) {
    alert("파일이 선택되지 않았습니다.");
    return false;
  }

  const ext = fileName.split('.').pop().toLowerCase();

  // 확장자 검사 (허용 확장자에 없으면 false)
  if (!fileEndNm.includes(ext)) {
    alert("해당 파일은 업로드 하실 수 없습니다.");
    return false;
  }

  // 파일 사이즈 검사 (사이즈 제한 있을 경우만)
  if (fileSize && !fnFleSizeCheck(id, fileSize)) {
    return false;
  }

  return true;
}

// 파일 사이즈 체크 함수
function fnFleSizeCheck(id, size) {
  const inputElem = id[0];
  if (!inputElem.files || !inputElem.files[0]) {
    alert("파일이 선택되지 않았습니다.");
    return false;
  }

  const file = inputElem.files[0];
  if (!fileUtil.checkFileSize(file, size)) {
    alert(`업로드 파일 사이즈는 ${size}MB 이내로 가능합니다.`);
    id.val('');  // 선택 초기화
    return false;
  }

  return true;
}







function fnInputTextSzeCheck(id, outId, size) {
    const $input = $("#" + id);
    const $output = $("#" + outId);

    $input.on('input', function() {
        let content = $input.val();

        if (content.length === 0) {
            $output.text('0자');
        } else {
            $output.text(content.length + '자');
        }

        if (content.length > size) {
            $input.val(content.substring(0, size));
            $output.text(size + '자');
        }
    });
}


/*
fnYoutubeEmbed({
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    width: 640,
    height: 360,
    controls: 1,
    autoplay: 0,
    containerId: "video-container"
});
*/
function fnYoutubeEmbed({ 
    src, 
    width = 560, 
    height = 315, 
    controls = 1, 
    autoplay = 0, 
    containerId = null 
}) {
    const embedUrl = `${src}?controls=${controls}&autoplay=${autoplay}`;

    const iframe = document.createElement('iframe');
    iframe.width = width;
    iframe.height = height;
    iframe.src = embedUrl;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    if (containerId) {
        const container = document.getElementById(containerId);
        if (container) container.appendChild(iframe);
    }

    return iframe; // 삽입 말고 반환만 할 수도 있음
}





function fnTrAdd(tableId, rowHtml) {
    $("#" + tableId + " > tbody:last").append(rowHtml);
}




function fnPassWordCheck(str) {
	const isValid = validationUtil.isPasswordValidBasic(str);

	if (!isValid) {
		alert("비밀번호는 영문/숫자/특수문자를 포함한 8~16자여야 합니다.");
	}

	return isValid;
}








/**
 * 두 개의 버튼이 있는 모달 팝업을 띄우는 공통 함수
 * @param {string} id - 클릭 트리거 요소의 ID
 * @param {string} title - 모달 제목
 * @param {string} content - 모달 본문 내용 (HTML 가능)
 * @param {string} lBtn - 왼쪽 버튼 텍스트
 * @param {string} rBtn - 오른쪽 버튼 텍스트
 * @param {function} lBtnFunc - 왼쪽 버튼 클릭 시 실행할 함수
 */
function fnTwoBtnPop(id, title, content, lBtn, rBtn, lBtnFunc) {
	const trigger = document.getElementById(id);
	if (!trigger) return;

	trigger.addEventListener("click", function (e) {
		e.preventDefault();

		// 이미 존재하는 모달이 있다면 제거
		const existing = document.getElementById("commonTwoBtnModal");
		if (existing) existing.remove();

		// 모달 HTML 생성
		const modalHtml = `
			<div class="modal fade" id="commonTwoBtnModal" tabindex="-1">
			  <div class="modal-dialog">
				<div class="modal-content">
				  <div class="modal-header">
					<h5 class="modal-title">${title}</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				  </div>
				  <div class="modal-body">
					${content}
				  </div>
				  <div class="modal-footer">
					<button type="button" class="btn btn-secondary" id="commonModalLeftBtn">${lBtn}</button>
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal">${rBtn}</button>
				  </div>
				</div>
			  </div>
			</div>
		`;

		// DOM에 추가
		document.body.insertAdjacentHTML("beforeend", modalHtml);

		// 이벤트 바인딩
		const leftBtn = document.getElementById("commonModalLeftBtn");
		if (leftBtn && typeof lBtnFunc === "function") {
			leftBtn.addEventListener("click", function () {
				lBtnFunc();
			});
		}

		// 모달 열기 (Bootstrap 5)
		const modalEl = document.getElementById("commonTwoBtnModal");
		const modal = new bootstrap.Modal(modalEl);
		modal.show();
	});
}






// 배열 비교 - 상위코드:값 매핑
function fnCodeArrayText(code, codeTextArray) {
  return codeMappingUtils.findTextByCode(code, codeTextArray, 'hirnkCommCd', 'commCdNm');
}

// 배열 비교 - 코드:값 매핑
function fnCodeValueArrayText(code, codeTextArray) {
  return codeMappingUtils.findTextByCode(code, codeTextArray, 'commCd', 'commCdNm');
}

// 배열 비교 - 자격증 코드 매핑
function fnCodeLcncsrArrayText(code, codeTextArray) {
  return codeMappingUtils.findTextByCode(code, codeTextArray, 'intgLcnscrGbcd', 'lcnscrNm');
}

// 채용분야 배열 비교
function fnStrCdCodeArrayText(code, codeTextArray) {
  return codeMappingUtils.findTextByCode(code, codeTextArray, 'aplfldMngno', 'aplfldNm');
}


/*
fnNullVoid -> formatUtil.formatNull(value, defaultValue);

fnFormetComma -> formatUtil.formatMoney(value);
*/



fnUrlCopy는 변경 할 필요 없음




fnEncodingParam 변경할 필요 없음
-> rest 공통쓸경우
restApi.save('/cmmn/ajax/encrypt.json', data).then(function(res) {
	if (res.resultCode === '0000') {
		const encrypted = res.resultData;
		restApi.save('/some/url', { encrypted });
	}
});






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- 페이징 유틸 -----------------------------

/**
 * 페이지 그룹 계산 함수
 * @param {number} cnt - 전체 데이터 개수
 * @param {number} pageIndex - 현재 페이지 번호 (1부터 시작)
 * @param {number} pageStep - 한 페이지당 보여줄 데이터 개수 (기본값 10)
 * @param {number} pageGroupSize - 페이지 그룹당 페이지 수 (기본값 10)
 * @returns {object} 페이지 그룹 정보 (총 페이지 수, 시작 페이지, 끝 페이지, 이전/다음 그룹 버튼 번호)
 */
function calculatePageGroup(cnt, pageIndex, pageStep = 10, pageGroupSize = 10) {
	// 전체 페이지 수 (총 데이터 수 / 페이지당 데이터 수, 올림 처리)
	const totalPage = Math.ceil(cnt / pageStep);
	// 현재 페이지가 속한 페이지 그룹의 시작 페이지 번호 계산
	const startPage = Math.floor((pageIndex - 1) / pageGroupSize) * pageGroupSize + 1;
	// 시작 페이지로부터 페이지 그룹 크기만큼 더했을 때, 총 페이지 수를 넘지 않도록 조정
	const endPage = Math.min(startPage + pageGroupSize - 1, totalPage);
	// 이전 페이지 그룹으로 이동할 때 클릭할 페이지 번호 (없으면 0 이하가 될 수 있음)
	const prevPageBtn = startPage - 1;
	// 다음 페이지 그룹으로 이동할 때 클릭할 페이지 번호 (없으면 총 페이지를 초과할 수 있음)
	const nextPageBtn = endPage + 1;

	// 계산된 페이지 그룹 정보를 객체로 반환
	return { totalPage, startPage, endPage, prevPageBtn, nextPageBtn };
}

/**
 * 페이징 HTML 생성 함수
 * @param {number} startPage - 현재 페이지 그룹의 시작 페이지 번호
 * @param {number} endPage - 현재 페이지 그룹의 끝 페이지 번호
 * @param {number} pageIndex - 현재 페이지 번호
 * @returns {string} 페이징 UI용 HTML 문자열
 */
function createPagingHtml(startPage, endPage, pageIndex) {
	let html = `
		<a href="javascript:void(0)" id="prevPageBtn" class="prev disabled">
			&lt;
		</a>
	`;

	// 시작 페이지부터 끝 페이지까지 페이지 번호 버튼 생성
	for (let i = startPage; i <= endPage; i++) {
		// 현재 페이지는 active 클래스를 붙여서 강조
		if (i === pageIndex) {
			html += `<a href="javascript:void(0)" class="active">${i}</a>`;
		} else {
			// 현재 페이지가 아니면 클릭 가능한 버튼 생성
			html += `<a href="javascript:void(0)" id="page_${i}">${i}</a>`;
		}
	}

	// 다음 페이지 그룹 버튼 생성
	html += `
		<a href="javascript:void(0)" id="nextPageBtn" class="next disabled">
			&gt;
		</a>
	`;

	return html;
}

/**
 * 페이징 버튼에 클릭 이벤트 바인딩 함수
 * @param {object} param0 - 페이징 관련 정보 객체
 * @param {number} param0.prevPageBtn - 이전 페이지 그룹 버튼 번호
 * @param {number} param0.nextPageBtn - 다음 페이지 그룹 버튼 번호
 * @param {number} param0.startPage - 현재 페이지 그룹의 시작 페이지 번호
 * @param {number} param0.endPage - 현재 페이지 그룹의 끝 페이지 번호
 * @param {number} param0.pageIndex - 현재 페이지 번호
 * @param {number} param0.totalPage - 전체 페이지 수
 */
function bindPagingEvents({ prevPageBtn, nextPageBtn, startPage, endPage, pageIndex, totalPage }) {
	// 이전 페이지 그룹 버튼 번호가 1 이상일 때만 활성화 및 클릭 이벤트 연결
	if (prevPageBtn >= 1) {
		$('#prevPageBtn').removeClass('disabled').click(() => fnChangePage(prevPageBtn));
	}

	// 다음 페이지 그룹 버튼 번호가 전체 페이지 수 이하일 때만 활성화 및 클릭 이벤트 연결
	if (nextPageBtn <= totalPage) {
		$('#nextPageBtn').removeClass('disabled').click(() => fnChangePage(nextPageBtn));
	}

	// 현재 페이지를 제외한 페이지 번호 버튼에 클릭 이벤트 연결
	for (let i = startPage; i <= endPage; i++) {
		if (i !== pageIndex) {
			$(`#page_${i}`).click(function () {
				const pageNum = parseInt(this.textContent, 10);
				fnChangePage(pageNum);  // 페이지 변경 함수 호출
			});
		}
	}
}

/**
 * 페이징 UI 초기화 및 렌더링 함수
 * @param {string} pagePosition - 페이징 UI를 렌더링할 HTML 요소의 ID
 * @param {number} cnt - 전체 데이터 개수
 * @param {number} pageIndex - 현재 페이지 번호
 * @param {number} [pageStep=10] - 한 페이지당 보여줄 데이터 개수
 * @param {number} [pageGroupSize=5] - 페이지 그룹당 페이지 수
 */
function fnSetPageBtn(pagePosition, cnt, pageIndex, pageStep = 10, pageGroupSize = 5) { 
	// 페이지 그룹 계산
	const pageGroup = calculatePageGroup(cnt, pageIndex, pageStep, pageGroupSize);
	// 계산된 페이지 그룹을 바탕으로 페이징 HTML 생성
	const html = createPagingHtml(pageGroup.startPage, pageGroup.endPage, pageIndex);
	// 지정된 위치에 페이징 HTML 삽입
	$(`#${pagePosition}`).html(html);
	// 페이징 버튼에 이벤트 바인딩
	bindPagingEvents({ ...pageGroup, pageIndex });
}

// ----------------------------- 페이지 이동 함수 -----------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


fnSoJUmCheck 소수점제한 -> validationUtil.isDecimalWithMaxDigits 로 개선


fnMaxLengthCheck 변경    -> oninput="limitUtils.enforceMaxLength로 변경
<input type="text" maxlength="5" oninput="limitUtils.enforceMaxLength(this)">









//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  fnListEngaOfcaItem함수 개선

/**
 * 공고 양식 데이터 조회 및 단계별 상태 설정
 * @param {string} engaOfcaMngno - 공고 번호
 * @param {string} engaXmnNo - 응시자 번호
 * @param {string|number} stepKey - 현재 진행 중인 단계 번호 (1~10)
 * @param {string} stepDivNm - 화면에서 사용하는 div ID 또는 클래스
 * @param {boolean} afterFunction - 후속 함수 호출 여부 (기본값: false)
 */
function fnListEngaOfcaItem(engaOfcaMngno, engaXmnNo, stepKey, stepDivNm, afterFunction = false) {
    console.log('engaOfcaMngno  ', engaOfcaMngno);

    // 유효하지 않은 공고번호 처리
    if (!engaOfcaMngno || engaOfcaMngno.trim() === '' || engaOfcaMngno === 'null') {
        engaOfcaMngno = '';
    }

    console.log('engaOfcaMngno after check ', engaOfcaMngno);

    const data = { engaOfcaMngno, engaXmnNo };

    $.ajax({
        url: "/inco/ajax/listEngaOfcaItem.json",
        type: "POST",
        data: data,
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.resultCode !== "0000") return;
            if (!data.resultData) return;

            handleSuccess(data.resultData, stepKey, stepDivNm, afterFunction);
        },
        error: function (e) {
            alert("에러 발생: " + JSON.stringify(e));
            console.error(e);
        }
    });
}

/**
 * 응답 데이터 기반으로 단계별 화면 상태 구성 처리
 */
function handleSuccess(resultData, stepKey, stepDivNm, afterFunction) {
    const { engaInfo, bsicMap, detailList, stepList } = resultData;
    const engaOfcaGbcd = engaInfo.engaOfcaGbcd; // 공고 구분코드
    let incoSupDucuProcCd = engaInfo.incoSupDucuProcCd; // 지원 상태 코드

    // 초기 상태 목록 생성
    let stepDivList = createInitialStepDivList();

    // 현재 진행 상태 index 계산
    const incoSupDucuProcCdIndex = getProcCdIndex(incoSupDucuProcCd, stepDivList);

    // 비주얼 영역 업데이트
    fnSetEngaSubVisualDiv(engaOfcaGbcd);

    // 공고 구분코드에 따른 특정 단계 상태 설정
    updateStepDivListByGbcd(engaOfcaGbcd, incoSupDucuProcCdIndex, stepDivList);

    // 응답된 사용 단계 리스트 기반으로 상태 설정
    updateStepDivListByStepList(stepList, incoSupDucuProcCdIndex, stepDivList);

    console.log('[common.js][fnListEngaOfcaItem] stepDivList : ', stepDivList);

    // 현재 단계 작성/수정 상태 설정
    updateCurrentStepState(stepKey, incoSupDucuProcCdIndex, stepDivList);

    // 화면 반영
    fnSetEngaStepDiv(stepDivList, stepDivNm);

    // 후속 처리 함수 실행 (필요 시)
    if (afterFunction) {
        const returnData = {
            engaInfo,
            engaOfcaGbcd,
            bsicMap,
            detailList,
            stepList: stepDivList,
        };
        console.log('afterFunction');
        fnAfterListEngaOfcaItem(returnData);
    }
}

/**
 * stepDivList 초기화 (단계 상태는 -1: 사용 안함, 0: 저장 안함, 1: 작성 중, 2: 저장 완료, 3: 수정 중)
 */
function createInitialStepDivList() {
    return [
        { step: '01', state: -1 }, // 희망지역 및 금고 선택
        { step: '02', state: -1 }, // 희망지역 및 직종 선택
        { step: '03', state: -1 }, // 개인정보
        { step: '04', state: -1 }, // 학력사항
        { step: '05', state: -1 }, // 자격사항
        { step: '06', state: -1 }, // 경력사항
        { step: '07', state: -1 }, // 포상 및 징계
        { step: '08', state: -1 }, // 기타사항
        { step: '09', state: -1 }, // 자기소개서
        { step: '10', state: 0 },  // 최종 완료
    ];
}

/**
 * 지원자 현재 상태 코드(incoSupDucuProcCd)를 기반으로 진행 index 반환
 * 최종 완료(10)일 경우 마지막 step 상태 완료 처리
 */
function getProcCdIndex(incoSupDucuProcCd, stepDivList) {
    if (!incoSupDucuProcCd || incoSupDucuProcCd === '00') return -1;

    if (incoSupDucuProcCd === '10') {
        stepDivList[stepDivList.length - 1].state = 2; // 최종 완료 상태
    }

    return stepDivList.findIndex(item => item.step === incoSupDucuProcCd);
}

/**
 * 공고 구분코드에 따라 특정 단계 상태 강제 설정
 */
function updateStepDivListByGbcd(engaOfcaGbcd, incoSupDucuProcCdIndex, stepDivList) {
    if (engaOfcaGbcd === '01') {
        const countStep = stepDivList.findIndex(item => item.step === '01');
        stepDivList[countStep].state = (countStep <= incoSupDucuProcCdIndex) ? 2 : 0;
    } else if (engaOfcaGbcd === '05') {
        const countStep = stepDivList.findIndex(item => item.step === '02');
        stepDivList[countStep].state = (countStep <= incoSupDucuProcCdIndex) ? 2 : 0;
    }

    // '01'이 아닌 경우 포상 및 징계 단계를 따로 설정
    if (engaOfcaGbcd !== '01') {
        const countStep = stepDivList.findIndex(item => item.step === '07');
        stepDivList[countStep].state = (countStep <= incoSupDucuProcCdIndex) ? 2 : 0;
    }
}

/**
 * stepList(사용자 입력 가능 항목)에 따라 각 단계 상태 설정
 */
function updateStepDivListByStepList(stepList, incoSupDucuProcCdIndex, stepDivList) {
    stepList.forEach(item => {
        if (item.useYn !== '1') return;

        let stepIndex = '';
        switch (item.engaItemMngno) {
            case '1': stepIndex = stepDivList.findIndex(i => i.step === '03'); break; // 개인정보
            case '2': stepIndex = stepDivList.findIndex(i => i.step === '04'); break; // 학력사항
            case '3': stepIndex = stepDivList.findIndex(i => i.step === '05'); break; // 자격사항
            case '4': stepIndex = stepDivList.findIndex(i => i.step === '06'); break; // 경력사항
            case '6': stepIndex = stepDivList.findIndex(i => i.step === '08'); break; // 기타사항
            case '7': stepIndex = stepDivList.findIndex(i => i.step === '09'); break; // 자기소개서
            default: stepIndex = '';
        }

        // 상태 업데이트
        if (stepIndex !== '' && stepIndex !== undefined) {
            stepDivList[stepIndex].state = (stepIndex <= incoSupDucuProcCdIndex) ? 2 : 0;
        }
    });
}

/**
 * 현재 진행 단계(stepKey)에 대한 상태를 작성 중 또는 수정 중으로 설정
 */
function updateCurrentStepState(stepKey, incoSupDucuProcCdIndex, stepDivList) {
    const index = stepKey - 1;
    if (index <= incoSupDucuProcCdIndex && stepKey !== '10') {
        stepDivList[index].state = 3; // 수정 중
    } else {
        stepDivList[index].state = 1; // 작성 중
    }
}


/**
 * 비주얼 영역 업데이트
 */
function fnSetEngaSubVisualDiv(engaOfcaGbcd) {
	const subVisual = document.querySelector('.sub-visual');
	if (!subVisual) return; // 존재하지 않으면 종료

	const subVisualContainer = subVisual.querySelector('.container');
	if (!subVisualContainer) return; // 내부 container 없으면 종료

	const message = '새마을금고와 도전을 함께 할 인재를 찾습니다.';
	let title = '';

	if (engaOfcaGbcd === '05') {
		subVisual.classList.add('sub5-3');
		subVisual.classList.remove('sub5-2');
		title = '새마을금고 인재풀 등록 안내';
	} else {
		subVisual.classList.add('sub5-2');
		subVisual.classList.remove('sub5-3');
		title = '입사지원서 작성';
	}

	subVisualContainer.innerHTML = `
		<h2>${title}</h2>
		<p>${message}</p>
	`;

	console.log('[common.js][fnListEngaOfcaItem] engaOfcaGbcd ', engaOfcaGbcd);
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 입사지원서 시작
function fnSetEngaStepDiv(itemList, stepListNm) {
  const stepMeta = {
    '01': { url: "/inco/hopeZoneGmgo.do", name: "희망지역 및 금고선택" },
    '02': { url: "/inco/talmnHopeOcpt.do", name: "희망지역 및 직종" },
    '03': { url: "/inco/incoPesnInfo.do", name: "개인정보" },
    '04': { url: "/inco/incoScreMtt.do", name: "학력사항" },
    '05': { url: "/inco/lcnsMtt.do", name: "자격사항" },
    '06': { url: "/inco/carrMtt.do", name: "경력사항" },
    '07': { url: "/inco/prizDipn.do", name: "포상 및 징계" },
    '08': { url: "/inco/etcMtt.do", name: "기타사항" },
    '09': { url: "/inco/slflntroDcmn.do", name: "자기소개서" },
    '10': { url: "/inco/incoLstConf.do", name: "최종 확인" },
  };

  let html = '';
  let step = 0;
  let clickStepList = [];
  let clickStepUrl = [];
  let nextPage = false;

  if (itemList) {
    itemList.forEach((item) => {
      if (item.state === -1) return;

      step++;
      const meta = stepMeta[item.step];
      if (!meta) return;

      const stepClass = item.state === 3 ? 'modify' : item.state === 2 ? 'complete' : item.state === 1 ? 'active' : '';
      html += `
        <a href="javascript:void(0);" class="step ${stepClass}" id="step_${step}" ${(item.step === '01' || item.step === '02') ? "style='flex-grow:1.5'" : ""}>
          <div class="step-number">
            <div class="step-number-inner">${step}</div>
          </div>
          <div class="step-body">
            <span class="text-process">Step ${step}.</span>
            <h4>${meta.name}</h4>
          </div>
        </a>`;

      if (item.state === 1 || item.state === 3) {
        nextPage = true;
      }

      clickStepList.push(step);
      clickStepUrl.push(item.state !== 0 ? meta.url : '');
    });
  }

  $('#' + stepListNm).html(html);

  clickStepList.forEach((stepId, idx) => {
    const url = clickStepUrl[idx];
    $(`#step_${stepId}`).off('click').on('click', () => fnMoveStepDivPage(url));
  });
}



// step 내부 페이지 이동 페이지 이동
function fnMoveStepDivPage(urlParam){
	if (!urlParam) return;

	const pageMoveForm = document.querySelector('form'); // 또는 getElementById('yourFormId')
	if (!pageMoveForm) {
		console.error('폼이 존재하지 않습니다.');
		return;
	}

	pageMoveForm.setAttribute('action', urlParam);
	pageMoveForm.submit();
}



// 입사지원서 이전 버튼 선택 시 이동 함수
function fnMovePrevPage() {
	const currentStepEl = document.querySelector('.step.active');
	if (!currentStepEl) {
		console.warn('현재 활성화된 step이 없습니다.');
		return;
	}

	const idParts = currentStepEl.id.split('_');
	const currentIndex = parseInt(idParts[idParts.length - 1], 10);
	if (currentIndex > 1) {
		const prevStepId = `${idParts[0]}_${currentIndex - 1}`;
		const prevStepEl = document.getElementById(prevStepId);
		if (prevStepEl) {
			prevStepEl.click();
		} else {
			console.warn(`이전 step(${prevStepId}) 엘리먼트를 찾을 수 없습니다.`);
		}
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





fnSetEngaSubVisualDivSelect -> 변경x 대신 테스트 필요함. engaOfcaGbcd를 ''로 보내도 되는지 확인 필요함




emailMasking -> maskingUtil.emailMasking 로 변경



//새마을금고 Story Thumb 이미지 사이즈 반응형 최적화 함수
function storyImg() {
  const prdImg = document.querySelectorAll("#modalStoryView-img .img-area");
  if (!prdImg.length) return;

  prdImg.forEach((element) => {
    const imgElement = element.querySelector("img");
    if (!imgElement) return;  // img가 없으면 건너뜀

    const imgSrc = imgElement.getAttribute("src");
    if (!imgSrc) return;      // src가 없으면 건너뜀

    // 배경 스타일 설정
    element.style.background = `url(${imgSrc}) no-repeat top/cover`;

    // 원래 img 태그의 크기와 가시성 조정
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";
    imgElement.style.opacity = "0";
  });
}








// 지원 분야 배열 리턴 -> rest.js 사용할 경우 아래처럼
function fnSelmasCommonCode(engaOfcaMngno) {
  return restApi.save("/cmmn/listSelmasCode.json", { engaOfcaMngno: engaOfcaMngno })
    .then(function(response) {
      if (response.resultCode === 0000) {
        return response.resultData;
      } else {
        // 실패 시 null 또는 빈 배열 반환 등 처리
        return null;
      }
    })
    .catch(function() {
      return null; // ajax 실패 시 null 반환
    });
}







// 셀렉트 박스 추가 배열의 길이만큼 추가
function fnSelmasSelectBoxOption(inputId, array, allText, selectedCode) {
  const cmmnEngaFldCode = fnCommonCmmnEngaFld();
  const selectElem = document.getElementById(inputId);
  if (!selectElem) return;

  const optionsData = array.map(item => ({
    aplfldMngno: item.aplfldMngno,
    aplfldNm: codeMappingUtils.findTextByCode(item.aplfldMngno, cmmnEngaFldCode, 'aplfldMngno', 'aplfldNm')
  }));

  selectUtils.setSelect(
    selectElem,
    optionsData,
    'aplfldNm',
    'aplfldMngno',
    selectedCode,
    allText,
  );
}




// 셀렉트 박스 추가 배열의 길이만큼 추가
function fnSelValmasCrsSelectBoxOption(inputId, array, allText, selectedCode) {
  const selectElem = document.getElementById(inputId);
  if (!selectElem) return;

  // array에서 옵션 데이터에 맞게 텍스트와 value 키로 변환
  const optionsData = array.map(item => ({
    pfscStrdScor: item.pfscStrdScor,     // 옵션 텍스트
    crsStrdMngno: item.crsStrdMngno      // 옵션 value
  }));

  selectUtils.setSelect(
    selectElem,
    optionsData,
    'pfscStrdScor',  // 옵션 표시 텍스트 키
    'crsStrdMngno',  // 옵션 value 키
    selectedCode,    // 기본 선택 값
    allText,
  );
}




// 셀렉트 박스 추가 배열의 길이만큼 추가
function fnLcnscrstdSelectBoxOption(className, array, allText, selectedCode) {
  //
  const selectElems = document.querySelectorAll(`.${className}`);
  if (!selectElems.length) return;

  selectElems.forEach(selectElem => {
    selectUtils.setSelect(
      selectElem,
      array,
      'lcnscrNm',
      'intgLcnscrGbcd',
      selectedCode,
      allText
    );
  });
}







fnChkMobile -> 그대로




fnTopMenuActive -> 그대로


fnTopMenuActiveLoad -> 그대로




function fnDetailBodyAddAreaAndUrlCopy(id) {
  const html = `
    <div class="modal fade" id="modalRecruitGeumgoInfo" tabindex="-1" data-bs-backdrop="static" aria-labelledby="modalArea" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-body"></div>
        </div>
      </div>
    </div>
    <div id="alertBox" class="alert alert-info" role="alert">
      URL이 복사되었습니다.
    </div>
  `;

  // id가 jQuery 셀렉터 형태라고 가정하고, 뒤에 html 삽입
  $(id).after(html);
}









