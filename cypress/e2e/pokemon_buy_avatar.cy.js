import * as data from '../helpers/pokemon_data.json';


describe('Покупка нового аватара для тренера', function(){
    it("Покупка аватара", function(){

        /*
        Авторизовываемся
         */

        cy.visit('https://pokemonbattle.ru');
        cy.get('.auth__input.k_form_f_email') // Ищем элемент логин и вводим верный логин
        .should('be.visible')
        .type(data.USER_LOGIN);
        cy.get('.auth__input.auth__input-icons.k_form_f_pass') // Ищем элемент пароль и вводим верный пароль
        .should('be.visible')
        .type(data.USER_PASSWORD);
        cy.get('.auth__button.k_form_send_auth') // Ищем кнопку Войти и кликаем ее
        .should('be.visible')
        .click();

        /*
        Покупаем на сайте аватар
        */

        cy.get('.header__container > .header__id') // Ищем кнопку профиля и кликаем ее
        .should('be.visible')
        .click(); 
        cy.get('.content__box-mobile > a:nth-child(5)') // Ищем кнопку Смена аватара и кликаем ее
        .should('be.visible')
        .click(); 
        cy.get('.shop > ul > li:nth-child(1) > button') // Покупаем первый аватар
        .should('be.visible')
        .click(); 

        /*
        Заполнение карты
        */

        cy.get('.pay__main-v2 > form > div > div:nth-child(2) > input') // Ввод номера карты
        .should('be.visible')
        .type('5555555555554444'); 
        cy.get('.pay-inputs-box > div:nth-child(1) > input') // Ввод даты валидности карты
        .should('be.visible')
        .type('0825');
        cy.get('.pay-inputs-box > div:nth-child(2) > input') // Ввод CVV код
        .should('be.visible')
        .type('125');
        cy.get('.pay__input-box-last-of > input') // Ввод имени и фамилии
        .should('be.visible')
        .type('ivan ivanov');
        cy.get('.pay__main-v2 > form > div > button') // Нажимаем кнопку оплатить
        .should('be.visible')
        .click();

        /*
        Код подтверждения из СМС
        */

        cy.get('#cardnumber') // Вводим код из СМС
        .should('be.visible')
        .type('56456');
        cy.get('.payment__main > form > div > div > button') // Нажимаем кнопку Отправить
        .should('be.visible')
        .click();

        /*
        Успешная операция
        */

        cy.get('.payment__form-container-defolt > form > div > div > h3') // Проверяем видимость и корректность сообщения об успешной покупки
        .should('be.visible').
        should('have.text','Покупка прошла успешно');

    })
})