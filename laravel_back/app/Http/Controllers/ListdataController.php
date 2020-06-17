<?php

namespace App\Http\Controllers;

use App\Listdata;
use Illuminate\Http\Request;

class ListdataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Listdata::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $list = new Listdata;
        $list->item = $request->item;
      
        return $list->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Listdata  $listdata
     * @return \Illuminate\Http\Response
     */
    public function show(Listdata $listdata)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Listdata  $listdata
     * @return \Illuminate\Http\Response
     */
    public function edit(Listdata $listdata)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Listdata  $listdata
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Listdata $listdata)
    {
        $listdata = Listdata::find($request->id);
        $listdata->item = $request->item;
        
        return $listdata->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Listdata  $listdata
     * @return \Illuminate\Http\Response
     */
    public function destroy(Listdata $listdata, $id)
    {
        $listdata = Listdata::find($id);
        return $listdata->delete();
    }
}
