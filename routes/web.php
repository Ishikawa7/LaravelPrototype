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

Route::get('login','LoginController@login');

Route::post('login','LoginController@checkLogin');

Route::get('logout','LoginController@logout');
Route::get('home','HomeController@index');
/* Route::get('home','HomeController@load_products'); */
Route::get('home/covid_api','HomeController@covid_api');
Route::get('home/meteo_api/{city_name}','HomeController@meteo_api');

Route::get('user','UserController@index');

Route::get('admin','AdminController@index');
