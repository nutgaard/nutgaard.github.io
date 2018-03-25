module RepoView exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (GithubRepo, Model)
import Msg exposing (Msg(NewExtra))
import Task


onEnter : Cmd Msg
onEnter =
    Task.succeed (NewExtra (Result.Ok []))
        |> Task.perform identity


single : GithubRepo -> Html Msg
single repo =
    div [ class "github__repo" ]
        [ h3 [] [ text repo.name ]
        , p [] [ text (toString repo.has_pages ++ " " ++ repo.pushed_at) ]

        --    , p [] [ text (repo.description |> Maybe.withDefault "") ]
        ]


view : Model -> Html Msg
view model =
    div [ class "grid github__repos grid--small-1 grid--medium-2 grid--large-3" ]
        (List.map single model.repos)
