import { Button, Divider, Typography } from '@mui/material'
import AutoCompleteCheckBox from 'app/components/recommender/AutoCompleteCheckBox'
import { useEffect, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import DropDownForm from 'app/components/recommender/DropDownForm'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { globalConstants } from 'app/constants/constant'
import {
  AutoCompleteOption,
  DropDownOption,
  ProductCategoryType,
  ProductItemsType,
} from '../recommender.types'

type ProductSelectionProps = {
  control: any
  category: ProductCategoryType[]
  items: ProductItemsType[]
}
function ProductSelection({ control, category, items }: ProductSelectionProps) {
  const { fields, append, remove } = useFieldArray({
    name: 'maxPromos',
    control,
  })
  const maximizePromosSelected = useWatch({
    control,
    name: 'maxPromos',
  })
  const [categoryList, setCategoryList] = useState<AutoCompleteOption[]>([])
  const [categoryItemList, setCategoryItemList] = useState<
    AutoCompleteOption[]
  >([])
  const [categoryMaxPromosList, setCategoryMaxPromosList] = useState<
    DropDownOption[]
  >([])
  const [maxPromoCategoryDisabledOptions, setMaxPromoCategoryDisabledOptions] =
    useState([])
  useEffect(() => {
    const reMapcategory = category.map(
      ({ category_id: categoryId, category }) => ({
        id: categoryId.toString(),
        label: category,
      })
    )
    const reMapcategoryMaxPromos = category.map(
      ({ category_id: categoryId, category }) => ({
        value: categoryId.toString(),
        label: category,
      })
    )
    setCategoryList(reMapcategory)
    setCategoryMaxPromosList(reMapcategoryMaxPromos)
  }, [category])
  useEffect(() => {
    const reMapcategoryItems = items.map(
      ({ item_id: itemId, item_name: itemName }) => ({
        id: itemId.toString(),
        label: itemName,
      })
    )
    setCategoryItemList(reMapcategoryItems)
  }, [items])

  useEffect(() => {
    const maxPromosCategoryToBeDisabled = maximizePromosSelected.map(
      (item: { maxPromosCategory: string }) => item.maxPromosCategory
    )

    setMaxPromoCategoryDisabledOptions(maxPromosCategoryToBeDisabled)
  }, [maximizePromosSelected])

  const maxOfferCount = Array.from(
    { length: globalConstants.setMaxOfferDefault },
    (_, index) => ({
      label: (index + 1).toString(),
      value: index + 1,
    })
  )
  return (
    <div className='grid grid-cols-4 gap-4 '>
      <Typography className='col-span-8'>Product</Typography>
      <AutoCompleteCheckBox
        control={control}
        label='Product Category'
        name='productCategory'
        options={categoryList}
        className='col-span-1'
      />
      <AutoCompleteCheckBox
        control={control}
        label='Item'
        name='productItem'
        options={categoryItemList}
        className='col-start-3 col-span-1'
      />
      {fields.map((field, index) => (
        <div key={field.id} className='col-start-1 col-span-2'>
          <div className='grid grid-flow-row grid-cols-6 gap-2'>
            <DropDownForm
              control={control}
              label='Max Promos Category'
              name={`maxPromos[${index}].maxPromosCategory`}
              options={categoryMaxPromosList}
              className='col-span-3'
              disabledOptions={maxPromoCategoryDisabledOptions}
            />
            <DropDownForm
              control={control}
              label='Count'
              name={`maxPromos[${index}].maxPromosCount`}
              options={maxOfferCount}
              className='col-span-1 col-start-4'
            />
            {index > 0 && (
              <DeleteOutlineIcon
                onClick={() => remove(index)}
                color='secondary'
                className='m-2  col-start-5'
              />
            )}
          </div>
        </div>
      ))}
      {maximizePromosSelected.length < categoryMaxPromosList.length && (
        <Button
          size='small'
          variant='contained'
          color='secondary'
          className='m-2 col-start-1 col-span-1'
          onClick={() => append({})}
          disabled={
            !(
              maximizePromosSelected.at(-1).maxPromosCategory &&
              maximizePromosSelected.at(-1).maxPromosCount
            )
          }
        >
          + Add Product Category
        </Button>
      )}

      <Divider className='col-span-8' />
    </div>
  )
}

export default ProductSelection
