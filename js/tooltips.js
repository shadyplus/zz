document.addEventListener("DOMContentLoaded", initTooltip);

function initTooltip() {
	//---------Tooltips---------//
	//Цвет подсказки
	const tooltipColor = '#3498db';
	//Позиция подсказки (справа/слева)
	const tooltipPosition = 'right';
	//Имя
	const tooltipName = "Asha Kija";
	//Телефон
	const tooltipPhone = "+255-XX-XXX-XXXX";
	//Вертикальный отступ подсказки
	const tooltipVerticalPadding = 5;
	//Смещение подсказки вверх от поля
	const tooltipTopPosition = -15;

	const tooltipStyle = `
	<style>
		.input-group{
			position:relative;
		}

		.input-group input{
			width:100%;
			box-sizing:border-box;
		}
	
		.input-group:before{
			z-index:99;
			content:attr(data-content)"";
			position:absolute;
			top:${tooltipTopPosition}px; 
			${tooltipPosition}:0; 
			background: ${tooltipColor}; 
			color:#fff;
			border-radius:5px;
			padding:${tooltipVerticalPadding}px 5px;
			font-family: Arial;
			font-size: 14px;
			line-height: normal;
		}

		.tooltip-hide.input-group:before{
			display: none;
		}
	</style>`.split("\n").join(' ');

	const inputs = [...document.querySelectorAll('.input-group > input')];
	const inputGroups = [...document.querySelectorAll('.input-group')];
	const phoneKeys = [46, 8, 9, 27, 107, 35, 36, 37, 38, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]; // Коды кнопок, которые можно нажимать в инпуте phone

	document.body.insertAdjacentHTML('beforeEnd', tooltipStyle);

	inputs.forEach((e, i = 0) => {
		e.onclick = () => {
			const inputWrapper = inputGroups[i]
			if (e.getAttribute('name') === "name") {
				inputWrapper.setAttribute('data-content', tooltipName);
				inputWrapper.classList.remove("tooltip-hide");
			} else if (e.getAttribute('name') === "phone") {
				inputWrapper.setAttribute('data-content', tooltipPhone);
				inputWrapper.classList.remove("tooltip-hide");

				e.addEventListener('keydown', (e) => {
					if (!(e.shiftKey && (e.keyCode == 61 || e.keyCode == 187) ||
						e.ctrlKey && e.keyCode == 65 ||
						phoneKeys.indexOf(e.keyCode) !== -1 && !e.shiftKey)) {
						e.preventDefault();
					}
				})
			}
		}
	})
}