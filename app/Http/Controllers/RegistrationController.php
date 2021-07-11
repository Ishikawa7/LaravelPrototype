<?php
namespace app\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;

class RegistrationController extends BaseController
{
    public function index(){
        return view('registration')
           ->with('csrf_token',csrf_token());
    }

    public function create(){
        $request = request();
        
        if($request->checkbox=="admin"){
            Admin::create([
                'email'=>$request->email,
                'password'=> Hash::make($request->password)
            ]);

            return redirect('login')
                ->with('csrf_token',csrf_token());
        }else{
            User::create([
                'email'=>$request->email,
                'password'=> Hash::make($request->password)
            ]);
        
            return redirect('login') 
                ->with('csrf_token',csrf_token());
        }
    }


    public function checkEmail(Request $request){
        
        if($request->checkbox=="admin"){
            $email=$request->get('email');
            $count_email = Admin::where('email',$email)->get()->count();
            $ceck_result = [];
            $ceck_result ['result'] ='false';
            if($count_email>0){
                $ceck_result ['result'] ='true' ; //array che poi verrà convertito in json
            }
            return $ceck_result;
        }else{
            
            $email=$request->get('email');
            $count_email = User::where('email',$email)->get()->count();
            $ceck_result = [];
            $ceck_result ['result'] ='false';
            if($count_email>0){
                $ceck_result ['result'] ='true' ; //array che poi verrà convertito in json
            }
            return $ceck_result;
        }
    }
}
?>