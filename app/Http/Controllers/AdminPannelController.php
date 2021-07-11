<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Admin;
use App\Models\Product;
use Illuminate\Support\Facades\Http;

class AdminPannelController extends BaseController
{
    public function index(){
        $admin= Admin::find(session('admin_id'));

        if($admin!=null){
            return view('admin_pannel');
        }
        return "nessun admin loggato";
    }

    public function admin_stats(){
        $result = DB::table('shoppings');
    }
}
?>  