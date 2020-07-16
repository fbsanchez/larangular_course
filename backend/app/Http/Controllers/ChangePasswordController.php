<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
        if ($this->getPasswordResetTableRow($request)->count() > 0) {
            return $this->changePassword($request);
        }

        return $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow(
        ChangePasswordRequest $request
    ) {
        return DB::table('password_resets')->where(
            [
                'email' => $request->email,
                'token' => $request->resetToken
            ]
        );
    }

    private function changePassword(
        ChangePasswordRequest $request
    ) {
        $user = User::where('email', $request->email)->first();

        $user->update(['password' => $request->password]);

        $this->getPasswordResetTableRow($request)->delete();

        return response()->json(
            ['data' => 'Password succesfully updated'],
            Response::HTTP_CREATED
        );
    }


    private function tokenNotFoundResponse()
    {
        return response()->json(
            ['error' => 'Invalid token or email'],
            Response::HTTP_UNPROCESSABLE_ENTITY
        );
    }
}
