import * as data from '../helpers/default_data.json'
import * as main_page from '../locators/main_page.json'
import * as recovery_password from '../locators/recovery_password_page.json'
import * as result_page from '../locators/result_page.json'

/*
    Заходим на сайт https://login.qa.studio/
    Ищем логин
    Вводим правильный логин
    Ищем пароль
    Вводим правильный пароль
    Ищем кнопку Войти
    Нажимаем кнопку Войти
    Проверяем текст сообщения успешной авторизации
*/

describe('Проверка авторизации', function(){

    //Используем для проверки перед каждым тестом
    this.beforeEach('Начало автотеста', function(){
        cy.visit('/'); //Заходим на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяем цвет кнопки Забыли пароль
    })
    
    this.afterEach('Конец теста', function(){
        cy.get(result_page.close).should('be.visible'); //Проверяем наличие иконки закрытия сообщения
        
    })

    it('Верный логин и пароль', function(){

        cy.get(main_page.email).should('have.attr', 'placeholder', 'E-mail'); //Правильность плейсхолдера в логине
        cy.get(main_page.email).type(data.login); //Ищем поле логин и вводим верный логин

        cy.get(main_page.password).type(data.password); //Ищем поле пароль и вводим верный пароль
        cy.get(main_page.password).should('have.attr', 'placeholder', 'пароль'); //Правильность плейсхолдера в пароле

        cy.get(main_page.login_button).click(); //Ищем кнопку Войти и кликаем ее

        cy.get(result_page.title).should('have.text','Авторизация прошла успешно'); //Проверяем текст сообщения
        cy.get(result_page.title).should('be.visible'); //Сообщение видно

    })

    it('Верный логин и неверный пароль', function(){

        cy.get(main_page.email).should('have.attr', 'placeholder', 'E-mail'); //Правильность плейсхолдера в логине
        cy.get(main_page.email).type(data.login); //Ищем поле логин и вводим верный логин

        cy.get(main_page.password).type('iloveqastudio1'); //Ищем поле пароль и вводим неверный пароль
        cy.get(main_page.password).should('have.attr', 'placeholder', 'пароль'); //Правильность плейсхолдера в пароле

        cy.get(main_page.login_button).click(); //Ищем кнопку Войти и кликаем ее

        cy.get(result_page.title).should('have.text','Такого логина или пароля нет'); //Проверяем текст сообщения
        cy.get(result_page.title).should('be.visible'); //Сообщение видно

    })

    it('Проверка, что в логине есть @', function(){

        cy.get(main_page.email).should('have.attr', 'placeholder', 'E-mail'); //Правильность плейсхолдера в логине
        cy.get(main_page.email).type('germandolnikov.ru'); //Ищем поле логин и вводим логин без @

        cy.get(main_page.password).type(data.password); //Ищем поле пароль и вводим верный пароль
        cy.get(main_page.password).should('have.attr', 'placeholder', 'пароль'); //Правильность плейсхолдера в пароле

        cy.get(main_page.login_button).click(); //Ищем кнопку Войти и кликаем ее

        cy.get(result_page.title).should('have.text','Нужно исправить проблему валидации'); //Проверяем текст сообщения
        cy.get(result_page.title).should('be.visible'); //Сообщение видно
    })

    it('Проверка восстановления пароля', function(){

        cy.get(main_page.email).should('have.attr', 'placeholder', 'E-mail'); //Правильность плейсхолдера в логине
        
        cy.get(main_page.password).should('have.attr', 'placeholder', 'пароль'); //Правильность плейсхолдера в пароле

        cy.get(main_page.fogot_pass_btn).should('have.text', 'Забыли пароль?'); //Проверяем текст кнопки Забыли пароль
        cy.get(main_page.fogot_pass_btn).click(); //Ищем кнопку Забыли пароль и кликаем ее
        cy.get(recovery_password.email).type(data.login); //Ищем поле имейл и вводим правильный имейл

        cy.get(recovery_password.send_button).should('have.text', 'Отправить код'); //Проверяем текст кнопки Отправить код
        cy.get(recovery_password.send_button).click(); //Ищем и нажимаем кнопку Отправить код

        cy.get(result_page.title).should('have.text','Успешно отправили пароль на e-mail'); //Проверяем текст сообщения
        cy.get(result_page.title).should('be.visible'); //Сообщение видно
    })

    it('Неверный логин и верный пароль', function(){
        cy.get(main_page.email).should('have.attr', 'placeholder', 'E-mail'); //Правильность плейсхолдера в логине
        cy.get(main_page.email).type('ivan@dolnikov.ru'); //Ищем поле логин и вводим неверный логин

        cy.get(main_page.password).type(data.password); //Ищем поле пароль и вводим верный пароль
        cy.get(main_page.password).should('have.attr', 'placeholder', 'пароль'); //Правильность плейсхолдера в пароле

        cy.get(main_page.login_button).click(); //Ищем кнопку Войти и кликаем ее

        cy.get(result_page.title).should('have.text','Такого логина или пароля нет'); //Проверяем текст сообщения
        cy.get(result_page.title).should('be.visible'); //Сообщение видно
    })

    it('Строчные буквы в логине и верный пароль', function(){
        cy.get(main_page.email).should('have.attr', 'placeholder', 'E-mail'); //Правильность плейсхолдера в логине
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); //Ищем поле логин и верный логин строчными буквами

        cy.get(main_page.password).type(data.password); //Ищем поле пароль и вводим верный пароль
        cy.get(main_page.password).should('have.attr', 'placeholder', 'пароль'); //Правильность плейсхолдера в пароле

        cy.get(main_page.login_button).click(); //Ищем кнопку Войти и кликаем ее

        cy.get(result_page.title).should('have.text','Авторизация прошла успешно'); //Проверяем текст сообщения
        cy.get(result_page.title).should('be.visible'); //Сообщение видно
    })


})