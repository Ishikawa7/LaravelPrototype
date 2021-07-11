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
Route::get('home/covid_api','HomeController@covid_api');
Route::get('home/meteo_api/{city_name}','HomeController@meteo_api');

Route::get('get_session', function() {
    /* if(isset(session('user_id'))){
        return session('user_id');
    }
    if(isset(session('admin_id'))){
        return session('admin_id');
    }
    return false; */
});

Route::get('user','UserController@index');

Route::get('admin','AdminController@index');