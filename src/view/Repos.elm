module Repos exposing (..)

import Date
import Debug
import Date.Extra.Compare exposing (Compare2(After))
import Html exposing (..)
import Html.Attributes exposing (class)
import Http
import Json.Decode exposing (Decoder, bool, int, string)
import Json.Decode.Pipeline exposing (decode, optional, required)
import Loader
import Model exposing (GithubRepo, Model)
import Msg exposing (Msg(RepositoriesReq))
import RepoView
import Statistics
import Task


sortRepos : List GithubRepo -> List GithubRepo
sortRepos repos =
    List.sortWith repoComparator repos

mergeRepos : Maybe (List GithubRepo) -> List GithubRepo -> Maybe (List GithubRepo)
mergeRepos maybeExisting newRepos =
    case maybeExisting of
        Nothing -> Maybe.Just (sortRepos newRepos)
        Just existing -> Maybe.Just (sortRepos (List.append existing newRepos))



repoComparator : GithubRepo -> GithubRepo -> Order
repoComparator a b =
    let
        aDate =
            Date.fromString a.pushed_at |> Result.withDefault (Date.fromTime 0)

        bDate =
            Date.fromString b.pushed_at |> Result.withDefault (Date.fromTime 0)

        aPages =
            a.has_pages

        bPages =
            b.has_pages
    in
        if aPages == bPages then
            if Date.Extra.Compare.is After aDate bDate then
                LT
            else
                GT
        else if aPages then
            LT
        else
            GT


onEnter : Model -> Cmd Msg
onEnter model =
    let
        baseurl = "https://api.github.com/users/nutgaard/repos?per_page=100&page="
        page = toString model.page
        requestUrl = String.append baseurl page
    in
        if not model.reposDone then
            Http.send RepositoriesReq (Http.get requestUrl responseDecoder)
        else
            Cmd.none

responseDecoder : Decoder (List GithubRepo)
responseDecoder =
    Json.Decode.list repoDecoder


repoDecoder : Decoder GithubRepo
repoDecoder =
    decode GithubRepo
        |> required "has_pages" bool
        |> required "name" string
        |> optional "description" (Json.Decode.map Just string) Nothing
        |> required "watchers_count" int
        |> required "fork" bool
        |> required "forks_count" int
        |> required "open_issues_count" int
        |> required "stargazers_count" int
        |> required "pushed_at" string
