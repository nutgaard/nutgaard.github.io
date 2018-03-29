module Menu exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Attributes.Aria exposing (..)
import Html.Events exposing (..)


clipPath : String
clipPath =
    "polygon(calc(50% - 1rem) 0, calc(50% + 1rem) 0, 50% 20%, 50% 20%)"


hoverClipPath : String
hoverClipPath =
    "polygon(10% 0, 90% 0, 57% 100%, 32% 76%)"


focusClipPath : String
focusClipPath =
    "polygon(10% 0, 90% 0, 57% 60%, 32% 36%)"


menuText : List String
menuText =
    [ "A menu", "concept", "which is", "perhaps usable" ]


type alias Model =
    { focus : Maybe Int
    , hover : Maybe Int
    }


initialModel : Model
initialModel =
    { focus = Maybe.Nothing
    , hover = Maybe.Nothing
    }


type Msg
    = SetHover (Maybe Int)
    | SetFocus (Maybe Int)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetFocus id ->
            ( { model | focus = id }, Cmd.none )

        SetHover id ->
            ( { model | hover = id }, Cmd.none )


clipper : Model -> Int -> String -> Html Msg
clipper model id txt =
    let
        hasHover =
            (model.hover |> Maybe.withDefault -1) == id

        hasFocus =
            (model.focus |> Maybe.withDefault -1) == id

        clip =
            if hasHover then
                hoverClipPath
            else if hasFocus then
                focusClipPath
            else
                clipPath
    in
        a
            [ class "clipper test"
            , href "https://www.utgaard.xyz"
            , onMouseEnter (SetHover (Maybe.Just id))
            , onMouseLeave (SetHover Maybe.Nothing)
            , onFocus (SetFocus (Maybe.Just id))
            , onBlur (SetFocus Maybe.Nothing)
            ]
            [ div [ class "clipper__element" ] [ text txt ]
            , div
                [ class "clipper__element clipper__overlay"
                , ariaHidden True
                , style [ ( "clipPath", clip ) ]
                ]
                [ text txt ]
            ]


view : Model -> Html Msg
view model =
    div [ class "menu", style [ ( "margin", "0px 1rem 1rem" ) ] ]
        (List.indexedMap (clipper model) menuText)
