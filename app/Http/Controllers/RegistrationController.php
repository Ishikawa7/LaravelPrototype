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
        $ceck_result = [];
        $ceck_result ['result'] ='not_present';
        $email=$request->email;
        /* return ['result'=> $request->admin]; */
        if($request->admin){
            $count_email = Admin::where('email',$email)->get()->count();
            if($count_email>0){
                $ceck_result ['result'] ='present' ; //array che poi verrà convertito in json
            }
            return $ceck_result;
        }else{
            $count_email = User::where('email',$email)->get()->count();
            if($count_email>0){
                $ceck_result ['result'] ='present' ; //array che poi verrà convertito in json
            }
            return $ceck_result;
        }
    }
}
?>