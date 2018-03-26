module RepoView exposing (..)

import Dict
import Grid
import Html exposing (..)
import Html.Attributes exposing (..)
import Loader
import Model exposing (GithubRepo, Model)
import Msg exposing (Msg(NewExtra))
import Task


onEnter : Cmd Msg
onEnter =
    Task.succeed (NewExtra (Result.Ok []))
        |> Task.perform identity


single : GithubRepo -> Html Msg
single repo =
    let
        tag =
            if repo.has_pages then
                a
            else
                div

        properties =
            if repo.has_pages then
                [ class "github__repo github__repo--haspages"
                , href ("//www.utgaard.xyz/" ++ repo.name ++ "/")
                ]
            else
                [ class "github__repo"
                ]
    in
        tag properties
            [ h3 [] [ text repo.name ]
            , p [] [ text (repo.description |> Maybe.withDefault "") ]
            ]

gridConfig : Grid.Config -> Grid.Config
gridConfig config = { config | padElement = div [ class "github__emptyrepo" ] []}


view : (List GithubRepo) -> Html Msg
view repos = Grid.view gridConfig (List.map single repos)