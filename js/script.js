$(document).ready(function() {
    let position = 0;           //начальная позиция, которую мы будем добавлять
    const slidesToShow = 1;     //сколько мы будем элементов показывать
    const slidesToScroll = 1;   //сколько элементов мы будем проскроливать
    const container = $('.slider-container');
    const track = $('.slider-track');
    const item = $('.slider-item');
    const btnPrev = $('.btn-prev');
    const btnNext = $('.btn-next');
    const itemCount = item.length;
    const itemWidth = container.width() / slidesToShow;   //задаём ширину элемента  =  ширина контейнера делится на кол-во показываемых эдементов
    const movePosition = slidesToScroll * itemWidth;        //величина сдвига эдементов : кол-во на ширину элемента



    item.each(function(index, item) {       //цикл each прописывает минимальную ширину в css
        $(item).css({
            minWidth: itemWidth,
        });
    });

    btnNext.click(function(){
        const itemsLeft = itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;       //остаток слайдов  === компенсация начального нуля кол-вом слайдов которые отображаются умноженные на их ширину вычитаемое из кол-ва слайдов
        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;            //у начальной позиции уменьшаем на величину сдвига

        setPosition();
        checkBtns();
    });    

    btnPrev.click(function(){
        const itemsLeft  = Math.abs(position) / itemWidth;  
        position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;            //к начальной позиции добавляем величину сдвига

        setPosition();
        checkBtns();
    });

    const setPosition = () => {
        track.css({
            transform: `translateX(${position}px)`  //на сколько сдвигается по оси Х
        });
    };

    const checkBtns = () => {           //проверка кнопок
        btnPrev.prop('disabled', position === 0);       //свойство disabled выключает кнопку, когда позиция нулевая
        btnNext.prop('disabled', position <= -(itemCount - slidesToShow) * itemWidth);
        
    };

    checkBtns();        //первоначальное отключение кнопки Prev после загрузки всего

});