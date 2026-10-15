
(function () {
    'use strict';

    var styleId = 'noma-sliders-shared-style';

    if (!document.getElementById(styleId)) {
        var css = [
            '.noma-shared-section{width:100%;max-width:1250px;margin:-70px auto 90px;padding:0 20px;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(380px,.75fr);gap:58px;align-items:center;font-family:Montserrat,Arial,sans-serif;color:#333}',
            '.noma-shared-slider{position:relative;width:100%;max-width:650px;aspect-ratio:1/1;overflow:hidden;border-radius:18px;margin:0 auto;cursor:ew-resize;user-select:none;-webkit-user-select:none;touch-action:pan-y;background:#f5f5f5}',
            '.noma-shared-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;user-select:none;-webkit-user-drag:none}',
            '.noma-shared-day{position:absolute;inset:0 auto 0 0;width:50%;height:100%;overflow:hidden;z-index:2}',
            '.noma-shared-day .noma-shared-img{max-width:none}',
            '.noma-shared-line{position:absolute;top:0;bottom:0;left:50%;width:2px;background:#fff;z-index:5;transform:translateX(-50%);pointer-events:none}',
            '.noma-shared-handle{position:absolute;top:50%;left:50%;width:42px;height:42px;border-radius:50%;background:#fff;z-index:6;transform:translate(-50%,-50%);box-shadow:0 2px 10px rgba(0,0,0,.15);pointer-events:none}',
            '.noma-shared-handle:before,.noma-shared-handle:after{content:"";position:absolute;top:50%;width:7px;height:7px;border-top:2px solid #555;border-right:2px solid #555}',
            '.noma-shared-handle:before{left:11px;transform:translateY(-50%) rotate(-135deg)}',
            '.noma-shared-handle:after{right:11px;transform:translateY(-50%) rotate(45deg)}',
            '.noma-shared-badge{position:absolute;bottom:18px;padding:7px 13px;border-radius:20px;background:rgba(255,255,255,.92);color:#555;font-size:13px;font-weight:600;z-index:7;pointer-events:none}',
            '.noma-shared-badge-day{left:18px}.noma-shared-badge-night{right:18px}',
            '.noma-shared-info{width:100%;max-width:480px;margin:0 auto}',
            '.noma-shared-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:45px;row-gap:30px}',
            '.noma-shared-item{min-width:0}',
            '.noma-shared-label{display:block;font-size:18px;line-height:1.3;font-weight:400;color:#777;margin-bottom:8px}',
            '.noma-shared-value{display:block;font-size:40px;line-height:1.05;font-weight:700;color:#333}',
            '.noma-shared-divider{width:100%;height:1px;background:#ddd;margin:30px 0}',
            '.noma-shared-details{margin-top:30px}',
            '.noma-shared-details .noma-shared-value{font-size:30px;line-height:1.2}',
            '.noma-shared-extra{font-size:17px;line-height:1.65;font-weight:400;color:#777;margin:0}',
            '@media(max-width:768px){.noma-shared-section{margin:-40px auto 60px;padding:0 15px;display:block}.noma-shared-slider-wrap{width:100%;margin-bottom:40px}.noma-shared-slider{max-width:100%}.noma-shared-info{max-width:100%}.noma-shared-grid{column-gap:30px;row-gap:28px}.noma-shared-label{font-size:16px}.noma-shared-value{font-size:32px}.noma-shared-details .noma-shared-value{font-size:25px}.noma-shared-extra{font-size:16px}.noma-shared-divider{margin:25px 0}}'
        ].join('');

        var style = document.createElement('style');
        style.id = styleId;
        style.textContent = css;
        document.head.appendChild(style);
    }

    function iniciar(config) {
        if (!config || !config.id || !config.dia || !config.noite) {
            return;
        }

        var sectionClass = 'noma-shared-section-' + config.id;
        if (document.querySelector('.' + sectionClass)) {
            return;
        }

        var material = document.querySelector('.noma-material');
        if (!material) {
            setTimeout(function () {
                iniciar(config);
            }, 500);
            return;
        }

        var section = document.createElement('section');
        section.className = 'noma-shared-section ' + sectionClass;

        var html = '<div class="noma-shared-slider-wrap">' +
            '<div class="noma-shared-slider">' +
            '<img class="noma-shared-img" src="' + config.noite + '" alt="' + (config.nome || 'Luminária') + ' - Noite">' +
            '<div class="noma-shared-day"><img class="noma-shared-img" src="' + config.dia + '" alt="' + (config.nome || 'Luminária') + ' - Dia"></div>' +
            '<div class="noma-shared-line"></div><div class="noma-shared-handle"></div>' +
            '<div class="noma-shared-badge noma-shared-badge-day">Dia</div>' +
            '<div class="noma-shared-badge noma-shared-badge-night">Noite</div>' +
            '</div></div><div class="noma-shared-info">';

        var itens = config.itens || [];
        var metade = Math.ceil(itens.length / 2);
        html += '<div class="noma-shared-grid">';

        for (var i = 0; i < itens.length; i++) {
            html += '<div class="noma-shared-item"><span class="noma-shared-label">' +
                itens[i].rotulo + '</span><strong class="noma-shared-value">' +
                itens[i].valor + '</strong></div>';
        }

        html += '</div>';

        if (config.soquete) {
            html += '<div class="noma-shared-divider"></div><div class="noma-shared-details">' +
                '<span class="noma-shared-label">Detalhes da lâmpada</span>' +
                '<strong class="noma-shared-value">' + config.soquete + '</strong></div>';
        }

        if (config.extraTitulo || config.extra) {
            html += '<div class="noma-shared-divider"></div><div class="noma-shared-details">';
            if (config.extraTitulo) {
                html += '<strong class="noma-shared-label" style="font-weight:700;color:#333">' +
                    config.extraTitulo + '</strong>';
            }
            if (config.extra) {
                html += '<p class="noma-shared-extra">' + config.extra + '</p>';
            }
            html += '</div>';
        }

        html += '</div>';
        section.innerHTML = html;
        material.parentNode.insertBefore(section, material);

        var slider = section.querySelector('.noma-shared-slider');
        var day = section.querySelector('.noma-shared-day');
        var line = section.querySelector('.noma-shared-line');
        var handle = section.querySelector('.noma-shared-handle');
        var dayImg = day.querySelector('img');
        var dragging = false;

        function resizeImage() {
            dayImg.style.width = slider.offsetWidth + 'px';
            dayImg.style.height = slider.offsetHeight + 'px';
        }

        function update(percent) {
            percent = Math.max(0, Math.min(100, percent));
            day.style.width = percent + '%';
            line.style.left = percent + '%';
            handle.style.left = percent + '%';
        }

        function moveTo(x) {
            var rect = slider.getBoundingClientRect();
            if (rect.width) {
                update(((x - rect.left) / rect.width) * 100);
            }
        }

        slider.addEventListener('pointerdown', function (event) {
            dragging = true;
            if (slider.setPointerCapture) {
                slider.setPointerCapture(event.pointerId);
            }
            moveTo(event.clientX);
        });

        slider.addEventListener('pointermove', function (event) {
            if (dragging) {
                moveTo(event.clientX);
            }
        });

        slider.addEventListener('pointerup', function () {
            dragging = false;
        });

        slider.addEventListener('pointercancel', function () {
            dragging = false;
        });

        window.addEventListener('resize', resizeImage);
        dayImg.addEventListener('load', resizeImage);
        resizeImage();
        setTimeout(resizeImage, 300);
        setTimeout(resizeImage, 800);
        update(50);
    }

    window.NomaSliders = {
        iniciar: iniciar
    };

    if (window.NomaSliderConfig) {
        iniciar(window.NomaSliderConfig);
    }
})();
