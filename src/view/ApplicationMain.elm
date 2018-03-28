module ApplicationMain exposing (..)

import About
import Array
import Html exposing (..)
import Html.Attributes exposing (..)
import Loader
import Model exposing (GithubRepo, Model)
import Msg exposing (Msg)
import PagesView
import RepoView
import Repos
import Statistics
import Tabs

repoView : (List GithubRepo -> List(Html Msg)) -> Model -> Html Msg
repoView subview model =
    let
        children = case model.repos of
            Nothing -> [ Loader.view ]
            Just repos -> subview repos
    in
        div [ class "github" ] children

repos : Model -> Html Msg
repos = repoView RepoView.view

pages : Model -> Html Msg
pages = repoView PagesView.view

tabConfig : Tabs.TabsConfig
tabConfig =
    [ { name = "Github pages", content = pages, onEnter = Repos.onEnter, hash = "#!pages" }
    , { name = "Github repos", content = repos, onEnter = Repos.onEnter, hash = "#!repos" }
    , { name = "About", content = About.view, onEnter = About.onEnter, hash = "#!about" }
    ]


view : Model -> Html Msg
view model =
    Html.main_ [ class "application__main" ]
        [ Tabs.view model tabConfig ]
