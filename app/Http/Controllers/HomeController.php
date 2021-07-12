<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Admin;
use App\Models\Product;
use App\Models\Review;
use App\Models\Favourite;
use Illuminate\Support\Facades\Http;

class HomeController extends BaseController
{
    public function index(){
        $user= User::find(session('user_id'));
        $admin= Admin::find(session('admin_id'));

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

    public function load_products(){
        
        $products = Product::all();
        return $products;
        
    }

    public function load_reviews(){
        
        $reviews = Review::all();
        return $reviews;
        
    }

    public function add_review($text, $id){     
        return Review::create([
            'TestoRecensione' => $text,
            'CodUtente' => session('user_id'),
            'CodProdotto' => $id
        ]);
        
    }

    public function add_favourites($id){     
        return Favourite::create([
            'RefCodProdotto' => $id,
            'RefCodUtente' => session('user_id')
        ]);
        
    }

    public function remove_favourites($id){     
        return Favourite::where('RefCodProdotto',$id)->where('RefCodUtente',session('user_id'))->delete();
        
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
        $response = Http::get('https://api.openweathermap.org/data/2.5/weather?q='.$city_name.'&appid='.env('API_KEY')); 

        if($response->failed()) abort(500);

        return $response->json();
    }
}
?>