module Update exposing (..)

import Random
import Msg exposing (..)
import Model exposing (..)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Inc -> ({model | count = model.count + 1}, Cmd.none)
        Dec -> ({model | count = model.count - 1}, Cmd.none)
        Roll -> (model, Random.generate RollResult (Random.int 1 6))
        RollResult value -> ({ model | count = value }, Cmd.none)
        Reset -> ({model | count = 0, content = "" }, Cmd.none)
        Change newContent -> ({model | content = newContent}, Cmd.none)