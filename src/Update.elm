module Update exposing (..)

import Model exposing (..)
import Msg exposing (..)
import Repos


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Inc ->
            ( model, Cmd.none )

        ChangeTab index cmd ->
            ( { model | selectedTab = index }, cmd )

        NewExtra (Ok repos) ->
            ( { model | repos = Repos.sortRepos repos }, Cmd.none )

        NewExtra (Err err) ->
            ( model, Cmd.none )
