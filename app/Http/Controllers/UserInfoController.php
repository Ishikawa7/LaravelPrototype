<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Admin;
use App\Models\Product;
use Illuminate\Support\Facades\Http;

class UserInfoController extends BaseController
{
    public function index(){
        $user= User::find(session('user_id'));

        if($user!=null){
            return view('user_info');
        }
        return "nessun admin loggato";
    }
    
    public function mediaAcquistiConBuono(){
        $user= User::find(session('user_id'));
        $result = Shopping::table()->select('conBuono',avg('importo'))->where('utente',$user->id)->groupBy('conBuono');
        return $result;
    }

    /* public function acquistiSpedizioniNonRecenti(){
        $user= User::find(session('user_id'));
        Shopping::table()->where('utente',$user->id)->where(Shopping::table()->)
    }
 */
}
?>  