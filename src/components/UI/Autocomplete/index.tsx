import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { Combobox } from '../Combobox'
import type { ComboboxPopupProps } from '../Combobox'
import { listItem, menuGroupLabel, menuSeparator } from '../styles'
import { withClassName } from '../utils'

export type AutocompletePopupProps = ComboboxPopupProps

const InputGroup = Combobox.InputGroup

const Item = withClassName(BaseAutocomplete.Item, `flex px-2.5 ${listItem}`)

const GroupLabel = withClassName(BaseAutocomplete.GroupLabel, menuGroupLabel)

const Separator = withClassName(BaseAutocomplete.Separator, menuSeparator)

export const Autocomplete = {
    Root: BaseAutocomplete.Root,
    InputGroup,
    Input: Combobox.Input,
    Clear: Combobox.Clear,
    Value: BaseAutocomplete.Value,
    Popup: Combobox.Popup,
    List: Combobox.List,
    Status: Combobox.Status,
    Empty: Combobox.Empty,
    Item,
    Group: BaseAutocomplete.Group,
    GroupLabel,
    Separator,
    Row: BaseAutocomplete.Row,
    Collection: BaseAutocomplete.Collection,
    useFilter: BaseAutocomplete.useFilter,
    useFilteredItems: BaseAutocomplete.useFilteredItems,
}
