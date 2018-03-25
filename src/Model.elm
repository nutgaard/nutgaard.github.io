module Model exposing (..)


type alias GithubRepo =
    { has_pages : Bool
    , name : String
    , description : Maybe String
    , watchers_count : Int
    , fork : Bool
    , forks_count : Int
    , open_issues_count : Int
    , stargazers_count : Int
    , pushed_at : String
    }


type alias Model =
    { selectedTab : Int
    , repos : List GithubRepo
    }


initialModel : Model
initialModel =
    { selectedTab = 0
    , repos = []
    }
