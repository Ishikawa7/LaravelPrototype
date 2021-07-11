<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('welcome', function () {
    return view('welcome');
});  */

Route::get('home','HomeController@index');

Route::get('home/load_products','HomeController@load_products');

Route::get('home/load_reviews','HomeController@load_reviews');

Route::get('home/add_review/{text}/{id}','HomeController@add_review');

Route::get('home/add_favourites/{id}','HomeController@add_favourites');

Route::get('home/remove_favourites/{id}','HomeController@remove_favourites');

Route::get('login','LoginController@login');

Route::post('login','LoginController@checkLogin');

Route::get('logout','LoginController@logout');

Route::get('registration','RegistrationController@index');

Route::post('registration/create','RegistrationController@create');

Route::post('registration/email','RegistrationController@checkEmail');

Route::get('home/covid_api','HomeController@covid_api');

Route::get('home/meteo_api/{city_name}','HomeController@meteo_api');

Route::get('get_session', function() {
    if(session('user_id')!==null){
        return 'user';
    }
    if(session('admin_id')!==null){
        return 'admin';
    }
    return 'null';
});

Route::get('user','UserController@index');

Route::get('admin','AdminController@index');
