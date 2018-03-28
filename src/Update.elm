module Update exposing (..)

import Menu
import Model exposing (..)
import Msg exposing (..)
import Navigation
import Repos


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange location -> ({ model | locationHash = location.hash }, Cmd.none)

        TabClick tabConfig ->
            (model, Cmd.batch [ Navigation.newUrl tabConfig.hash, tabConfig.onEnter model ])

        NewExtra (Ok repos) ->
            ( { model | repos = Maybe.Just (Repos.sortRepos repos) }, Cmd.none )

        NewExtra (Err err) ->
            ( model, Cmd.none )

        MenuMsg subMsg ->
            let
                (updatedMenuModel, menuCmd) = Menu.update subMsg model.menu
            in
                ({ model | menu = updatedMenuModel }, Cmd.map MenuMsg menuCmd)
