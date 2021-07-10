<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Admin;

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
    
    //URL: 'https://api.covid19api.com/summary'
    public function covid_api(){
       
    }
}
?>