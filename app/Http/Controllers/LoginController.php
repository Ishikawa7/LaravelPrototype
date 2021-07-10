<?php
namespace app\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;

class LoginController extends BaseController
{
    public function login(){
        //verifico se l'utente ha già fatto il login
        if(session('id')!=null){
           return redirect('home');
       }else{
           //Verifichiamo se c'è stato un'errore nel login
           return view('login')
           ->with('csrf_token',csrf_token());
       } 
    
    }

public function checkLogin(){
    if(request('checkbox')==1){
        $admin = Admin::where('email',request('email'))->where('password',request('password'))->first(); 
        if(isset($admin)){
            //credenziali valide
            Session::put('admin_id',$admin->id);
            Session::put('isAdmin',1);
            return view('home')
                ->with('nome',$user->nome);
        }else{
            return view('login')
                ->with('csrf_token',csrf_token());
        }
    }else{
        $user = User::where('email',request('email'))->where('password',request('password'))->first();
        if(isset($user)){
            //credenziali valide
            Session::put('user_id',$user->id);
            return view('home')
                ->with('nome',$user->nome);
        }else{
            return view('login')
                ->with('csrf_token',csrf_token());
        }  
    }
}

public function logout(){
    //eliminiamo i dati di sessione
    Session::flush();
    //torniamo al login
    return redirect('login');
} 
   
    
}
?>
