<template>
  <div>
    <div>
      <el-tabs v-model="tabValue" @tab-change="TabChangeHandle">
        <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name" :name="item.value"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="form-box">
      <el-form inline class="form">
        <el-form-item label="关键词">
          <el-input v-model.trim="searchValue" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SearchClickHandle">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="isShow = true">新增商品</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" table-layout="auto" height="600">
        <el-table-column label="商品" width="320" prop="shop">
          <template #default="scope">
            <div class="shopList">
              <el-image class="image" :src="scope.row.cover" width="80"></el-image>
              <div class="shopContent">
                <p class="shopName">{{ scope.row.desc }}</p>
                <p>
                  <span class="shopPrice1">{{ `￥${scope.row.min_price}` }}</span>
                  <el-divider direction="vertical" />
                  <span class="shopPrice2">{{ `￥${scope.row.min_oprice}` }}</span>
                </p>
                <p class="shopCatergory">{{ `分类:${scope.row.category?.name}` }}</p>
                <p class="shopDate">{{ `创建时间:${scope.row.create_time}` }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际销量" prop="sale_count" align="center"></el-table-column>
        <el-table-column label="商品状态" prop="status" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status" class="ml-2" type="success">上架</el-tag>
            <el-tag v-else class="ml-2" type="danger">仓库</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template #default="scope">
            <span v-if="scope.row.ischeck == 1">通过</span>
            <span v-else>拒绝</span>
          </template>
        </el-table-column>
        <el-table-column label="总库存" prop="stock" align="center"></el-table-column>
        <el-table-column label="操作" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination class="pagination" background layout="prev, pager, next" :total="useState.totalSize" :page-size="10"
        @current-change="PageChangeHandle" />
    </div>
    <el-drawer v-model="isShow" direction="rtl" size="40%">
      <template #header>
        <h4>新增商品</h4>
      </template>
      <template #default>
        <el-form label-position="right" label-width="100px">
          <el-form-item label="商品名称">
            <el-input placeholder="请输入商品名称，不能超过60个字符"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="value" placeholder="Select" size="large">
              <el-option />
            </el-select>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="textarea" :rows="2" type="textarea" />
          </el-form-item>
          <el-form-item label="单位">
            <el-input placeholder="件"></el-input>
          </el-form-item>
          <el-form-item label="总库存">
            <el-input-number v-model="num" :min="1" :max="100" controls-position="right" />
          </el-form-item>
          <el-form-item label="库存预警">
            <el-input-number v-model="num" :min="1" :max="100" controls-position="right" />
          </el-form-item>
          <el-form-item label="最低销售价">
            <el-input-number v-model="num" :min="1" :max="100" controls-position="right" />
          </el-form-item>
          <el-form-item label="最低原价">
            <el-input-number v-model="num" :min="1" :max="100" controls-position="right" />
          </el-form-item>
          <el-form-item label="库存显示">
            <el-radio-group v-model="radio2">
              <el-radio label="隐藏">隐藏</el-radio>
              <el-radio label="显示">显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-radio-group v-model="radio2">
              <el-radio label="仓库">仓库</el-radio>
              <el-radio label="上架">上架</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button>cancel</el-button>
          <el-button type="primary">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStateStores } from '../../store/stateStores'

const useState = useStateStores()
const isShow = ref(false)
const { getGoods } = useState

const tabValue = ref('all')

const searchValue = ref('')

getGoods('all', null, null, null, 1)

const tableData = computed(
  () => useState.shopList
)

const tabs = ref([
  {
    name: '全部',
    value: 'all'
  },
  {
    name: '审核中',
    value: 'checking'
  },
  {
    name: '出售中',
    value: 'saling'
  },
  {
    name: '已下架',
    value: 'off'
  },
  {
    name: '库存预警',
    value: 'min_stock'
  },
  {
    name: '回收站',
    value: 'delete'
  }
])

const PageChangeHandle = (page) => {
  getGoods(tabValue.value, null, null, null, page)
}

const TabChangeHandle = (name) => {
  // console.log(name);
  getGoods(name, null, null, null, 1)
}

const SearchClickHandle = () => {
  getGoods(name, searchValue.value, null, null, 1)
}
</script>

<style scope lang="scss">
.form-box {
  padding: 3px 0;

  .form {
    .el-button {
      margin: 0;
      padding: 5;
    }
  }
}

.table-container {

  // @apply h-full;
  .shopList {
    @apply flex flex-row;

    .image {
      @apply w-[80px] h-[80px] mt-3;
    }

    .shopContent {
      @apply text-left whitespace-nowrap text-ellipsis p-2;

      overflow: hidden;

      .shopName {
        @apply text-gray-800;
      }

      .shopPrice1 {
        @apply text-red-600;
      }

      .shopPrice2 {
        @apply text-gray-600;
      }

      .shopCatergory,
      .shopDate {
        @apply text-gray-400;
      }
    }
  }
}

.pages {
  @apply w-full flex flex-row justify-center mt-5;

  .pagination {
    @apply justify-center;
  }
}
</style>
