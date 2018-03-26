module Tabs exposing (..)

import Array exposing (Array)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Model exposing (Model)
import Msg exposing (..)


type alias TabConfig =
    { name : String, content : Model -> Html Msg, onEnter : Cmd Msg }


type alias TabsConfig =
    List TabConfig


toTab : Int -> Int -> TabConfig -> Html Msg
toTab selected index tabConfig =
    let
        className =
            if selected == index then
                "tabs__tabbutton tabs__tabbutton--isactive"
            else
                "tabs__tabbutton"
    in
        button [ class className, onClick (ChangeTab index tabConfig.onEnter) ] [ h2 [] [ text tabConfig.name ] ]


getContent : Model -> List TabConfig -> Html Msg
getContent model contentList =
    case Array.get model.selectedTab (Array.fromList contentList) of
        Maybe.Just config ->
            div [ class "tabs__content" ] [ config.content model ]

        Maybe.Nothing ->
            Html.div [] [ text "Could not find page" ]


view : Model -> TabsConfig -> Html Msg
view model tabConfig =
    div [ class "tabs" ]
        (List.append (List.indexedMap (toTab model.selectedTab) tabConfig) [ getContent model tabConfig ])
