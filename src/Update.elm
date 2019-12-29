module Update exposing (..)

import ApplicationMain exposing (tabConfig)
import Menu
import Model exposing (..)
import Msg exposing (..)
import Navigation
import Repos


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange location ->
            if List.member location.hash (List.map (\tab -> tab.hash) tabConfig) then
                ( { model | locationHash = location.hash }, Cmd.none )
            else
                ( model, Navigation.newUrl "#!pages" )

        TabClick tabConfig ->
            ( model, Cmd.batch [ Navigation.newUrl tabConfig.hash, tabConfig.onEnter model ] )

        RepositoriesReq (Ok repos) -> let
          reposDone = if List.length repos == 100 then False else True
          page = if List.length repos == 100 then model.page + 1 else model.page
          extraCmd = if List.length repos == 100 then Repos.onEnter ({ model | page = page }) else Cmd.none
        in
            ( { model | repos = Repos.mergeRepos model.repos repos, page = page, reposDone = reposDone }, extraCmd )

        RepositoriesReq (Err err) ->
            ( model, Cmd.none )

        MenuMsg subMsg ->
            let
                ( updatedMenuModel, menuCmd ) =
                    Menu.update subMsg model.menu
            in
                ( { model | menu = updatedMenuModel }, Cmd.map MenuMsg menuCmd )
