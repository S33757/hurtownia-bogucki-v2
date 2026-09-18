document.addEventListener('DOMContentLoaded', function () {
    var przycisk = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.site-header nav');

    if (przycisk && nav) {
        przycisk.addEventListener('click', function () {
            var otwarte = nav.classList.toggle('otwarte');
            przycisk.setAttribute('aria-expanded', otwarte ? 'true' : 'false');
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('otwarte');
                przycisk.setAttribute('aria-expanded', 'false');
            });
        });
    }

    var tabela = document.querySelector('.godziny-tabela');
    if (!tabela) return;

    var teraz = new Date();
    var numerDnia = teraz.getDay() === 0 ? 7 : teraz.getDay();
    var wiersz = tabela.querySelector('[data-dzien="' + numerDnia + '"]');
    if (!wiersz) return;

    wiersz.classList.add('dzisiaj');

    var status = document.querySelector('[data-status-godzin]');
    if (!status) return;

    var minutyTeraz = teraz.getHours() * 60 + teraz.getMinutes();
    var otwarte = false;

    if (wiersz.dataset.od && wiersz.dataset.do) {
        var naMinuty = function (godzina) {
            var czesci = godzina.split(':');
            return parseInt(czesci[0], 10) * 60 + parseInt(czesci[1], 10);
        };
        otwarte = minutyTeraz >= naMinuty(wiersz.dataset.od) && minutyTeraz < naMinuty(wiersz.dataset.do);
    }

    status.textContent = otwarte ? 'Teraz otwarte' : 'Teraz zamknięte';
    status.classList.add(otwarte ? 'status-otwarte' : 'status-zamkniete');
});
