<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Http;

class HomeController extends BaseController
{
    public function index(){
        $user= User::find(session('id'));
        $admin= Admin::find(session('id'));

        if($user!=null){
            return view('home')
              ->with('nome',$user->email);
        }elseif($admin!=null){
            return view('home')
              ->with('nome',$admin->utente);
        }
        return view('home')
            ->with('nome',null);
    }
    
    // URL: 'https://api.covid19api.com/summary'
    public function covid_api(){
        $response = Http::get('https://api.covid19api.com/summary'); 

        if($response->failed()) abort(500);

        return $response->json();
    }

    /* 
    $APIkey = '0c9ca3df42eda585a44501afb92cc5ec';
    $url = 'https://api.openweathermap.org/data/2.5/weather?q='.$city_name.'&appid='.$APIkey; 
    */
    public function meteo_api($city_name){
        $APIkey = '0c9ca3df42eda585a44501afb92cc5ec';
        $response = Http::get('https://api.openweathermap.org/data/2.5/weather?q='.$city_name.'&appid='.$APIkey); 

        if($response->failed()) abort(500);

        return $response->json();
    }
}
?>