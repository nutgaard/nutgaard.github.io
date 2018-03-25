module ApplicationMain exposing (..)

import About
import Array
import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (Model)
import Msg exposing (Msg)
import Repos
import Tabs


tabConfig : Model -> Tabs.TabsConfig
tabConfig model =
    [ { name = "Github repos", content = Repos.view, onEnter = Repos.onEnter model }
    , { name = "Github pages", content = Repos.view, onEnter = Repos.onEnter model }
    , { name = "About", content = About.view, onEnter = About.onEnter }
    ]


view : Model -> Html Msg
view model =
    Html.main_ [ class "application__main" ]
        [ Tabs.view model (tabConfig model) ]
