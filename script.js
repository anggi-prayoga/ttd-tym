var step = 'main';
var isInput = true;

var putar;
var rotasi = -69;
var rotasiStep = 8;
var rotasiArah = 1;
var durasi = 0;

function aksi() {
	switch (step) {
	case 'ke main a':
		isInput = false;
		setTransisi(true);
		setTimeout(aksi, 1000);
		step = 'ke main b';
		break;
	case 'ke main b':
		document.getElementById('play').style.display = 'block';
		document.getElementById('escape').style.display = 'none';
		document.getElementById('failed').style.display = 'none';
		setTransisi(false);
		setTimeout(aksi, 1000);
		step = 'main';
		break;
	case 'main':
		isInput = true;
		break;
	case 'ke level 1 a':
		isInput = false;
		setTransisi(true);
		setTimeout(aksi, 1000);
		step = 'ke level 1 b';
		break;
	case 'ke level 1 b':
		document.getElementById('img1').style.display = 'block';
		document.getElementById('img2').style.display = 'none';
		document.getElementById('jarum').style.display = 'block';
		document.getElementById('play').style.display = 'none';
		setTransisi(false);
		setTimeout(aksi, 1000);
		step = 'level 1';
		break;
	case 'level 1':
		isInput = true;
		setPutar(true);
		break;
	case 'ke level 2 a':
		document.getElementById('sukses').className = 'on';
		isInput = false;
		setPutar(false)
		setTransisi(true);
		setTimeout(aksi, 1000);
		step = 'ke level 2 b';
		break;
	case 'ke level 2 b':
		document.getElementById('sukses').className = '';
		document.getElementById('img1').style.display = 'none';
		document.getElementById('img2').style.display = 'block';
		setTransisi(false);
		setTimeout(aksi, 1000);
		step = 'level 2';
		break;
	case 'level 2':
		isInput = true;
		setPutar(true);
		break;
	case 'ke berhasil a':
		document.getElementById('sukses').className = 'on';
		isInput = false;
		setPutar(false);
		setTransisi(true);
		setTimeout(aksi, 1000);
		step = 'ke berhasil b';
		break;
	case 'ke berhasil b':
		document.getElementById('sukses').className = '';
		document.getElementById('img1').style.display = 'none';
		document.getElementById('img2').style.display = 'none';
		document.getElementById('jarum').style.display = 'none';
		document.getElementById('play').style.display = 'none';
		document.getElementById('escape').style.display = 'block';
		document.getElementById('failed').style.display = 'none';
		setTransisi(false);
		setTimeout(aksi, 1000);
		step = 'berhasil';
		break;
	case 'berhasil':
		isInput = true;
		break;
	case 'ke gagal a':
		isInput = false;
		setPutar(false);
		setTransisi(true);
		setTimeout(aksi, 1000);
		step = 'ke gagal b';
		break;
	case 'ke gagal b':
		document.getElementById('img1').style.display = 'none';
		document.getElementById('img2').style.display = 'none';
		document.getElementById('jarum').style.display = 'none';
		document.getElementById('play').style.display = 'none';
		document.getElementById('escape').style.display = 'none';
		document.getElementById('failed').style.display = 'block';
		setTransisi(false);
		setTimeout(aksi, 1000);
		step = 'gagal';
		break;
	case 'gagal':
		isInput = true;
		break;
	}
}

function setTransisi(b) {
	if (b) {
		document.getElementById('hitam').className = 'on';
	} else {
		document.getElementById('hitam').className = '';
	}
}

function setPutar(b) {
	if (b) {
		putar = setInterval(_putar, 16.67);
		durasi = 0;
	} else {
		clearInterval(putar);
	}
}

function _putar() {
	rotasi += rotasiStep * rotasiArah;
	if (rotasi > 70 || rotasi < -70) {
		rotasiArah *= -1
	}
	document.getElementById('jarum').style.transform = 'rotate(' + rotasi + 'deg)';
	durasi += .0167;
	if (durasi > 30) {
		step = 'ke gagal a';
		aksi();
		durasi = 0;
	}
}

window.addEventListener('keydown', (e) => {
	if (e.key === ' ') {
		tap();
		e.preventDefault();
	}
});

document.addEventListener('click', tap);

function tap() {
	if (isInput) {
		switch (step) {
		case 'main':
			step = 'ke level 1 a';
			aksi();
			break;
		case 'level 1':
			if (rotasi > -18 && rotasi < 18) {
				step = 'ke level 2 a';
				aksi();
			} else {
				step = 'ke gagal a';
				aksi();
			}
			break;
		case 'level 2':
			if (rotasi > 52) {
				step = 'ke berhasil a';
				aksi();
			} else {
				step = 'ke gagal a';
				aksi();
			}
			break;
		case 'berhasil':
		case 'gagal':
			step = "ke main a";
			aksi();
			break;
		}
	}
}