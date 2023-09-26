<script setup>
import { defineComponent, h, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createDiscreteApi, darkTheme, lightTheme } from "naive-ui";
import { CashOutline as CashIcon } from "@vicons/ionicons5";
import axios from "axios";

const { message, notification, dialog, loadingBar } = createDiscreteApi([
  "message",
  "dialog",
  "notification",
  "loadingBar",
]);

let valueOne = ref();
let valueTwo = ref();
let valueThree = ref();
let valueFour = ref();
let valueFive = ref();
let valueSix = ref();
let valueSeven = ref();
let valueEight = ref();
let updateTime = ref();
let ND = 0;
let valueOneBack = ref(ND);
let valueTwoBack = ref(ND);
let valueThreeBack = ref(ND);
let valueFourBack = ref(ND);
let valueFiveBack = ref(ND);
let valueSixBack = ref(ND);
let valueSevenBack = ref(ND);
let valueEightBack = ref(ND);
let disabled = ref();
var principal = ref();
let value = ref(null);

let valueOneBackS = ref();
let valueTwoBackS = ref();
let valueThreeBackS = ref();
let valueFourBackS = ref();
let valueFiveBackS = ref();
let valueSixBackS = ref();
let valueSevenBackS = ref();
let valueEightBackS = ref();

let valueOneBackShake = ref();
let valueTwoBackShake = ref();
let valueThreeBackShake = ref();
let valueFourBackShake = ref();
let valueFiveBackShake = ref();
let valueSixBackShake = ref();
let valueSevenBackShake = ref();
let valueEightBackShake = ref();
let inputValidationShake = ref();

var TableData = ref([]);

//input 验证↓↓
let inputValidation = ref();
var option = [
  {
    label: "自定义",
    value: "none",
    ttg: {
      s0: 1.3,
      s1: 1.3,
      s2: 1.3,
      s3: 1.3,
      s4: 1.3,
      s5: 1.3,
      s6: 1.3,
      s7: 1.3,
    },
  },
];
function AcquireMagnification(value) {
  if (value == 0) {
    var firstBack = valueOne;
  } else if (value == 1) {
    var firstBack = valueTwo;
  } else if (value == 2) {
    var firstBack = valueThree;
  } else if (value == 3) {
    var firstBack = valueFour;
  } else if (value == 4) {
    var firstBack = valueFive;
  } else if (value == 5) {
    var firstBack = valueSix;
  } else if (value == 6) {
    var firstBack = valueSeven;
  } else {
    var firstBack = valueEight;
  }
  return firstBack;
}

function JudgementSubscript(value) {
  if (value == 0) {
    var firstBack = valueOneBack;
  } else if (value == 1) {
    var firstBack = valueTwoBack;
  } else if (value == 2) {
    var firstBack = valueThreeBack;
  } else if (value == 3) {
    var firstBack = valueFourBack;
  } else if (value == 4) {
    var firstBack = valueFiveBack;
  } else if (value == 5) {
    var firstBack = valueSixBack;
  } else if (value == 6) {
    var firstBack = valueSevenBack;
  } else {
    var firstBack = valueEightBack;
  }
  return firstBack;
}
function EmptyInputGet(value) {
  if (value == 0) {
    var firstBack = valueOneBackS;
  } else if (value == 1) {
    var firstBack = valueTwoBackS;
  } else if (value == 2) {
    var firstBack = valueThreeBackS;
  } else if (value == 3) {
    var firstBack = valueFourBackS;
  } else if (value == 4) {
    var firstBack = valueFiveBackS;
  } else if (value == 5) {
    var firstBack = valueSixBackS;
  } else if (value == 6) {
    var firstBack = valueSevenBackS;
  } else {
    var firstBack = valueEightBackS;
  }
  return firstBack;
}
function ShakeModle(value) {
  if (value == 0) {
    var firstBack = valueOneBackShake;
  } else if (value == 1) {
    var firstBack = valueTwoBackShake;
  } else if (value == 2) {
    var firstBack = valueThreeBackShake;
  } else if (value == 3) {
    var firstBack = valueFourBackShake;
  } else if (value == 4) {
    var firstBack = valueFiveBackShake;
  } else if (value == 5) {
    var firstBack = valueSixBackShake;
  } else if (value == 6) {
    var firstBack = valueSevenBackShake;
  } else {
    var firstBack = valueEightBackShake;
  }
  return firstBack;
}
function selectOpGet(subMatchList, weekValue) {
  for (var i = 0; i < subMatchList.length; i++) {
    let a = subMatchList[i].awayTeamAllName;
    let b = subMatchList[i].homeTeamAbbName;
    a = JSON.stringify(a);
    b = JSON.stringify(b);
    var text = "" + a + " VS " + b + "";
    text = text.replace(/\"/g, "");
    var setOption = {
      label: text,
      value: weekValue + i,
      ttg: subMatchList[i].ttg,
    };
    option.splice(option.length, 0, setOption);
  }
}

function getWeek(wek, value) {
  // console.log(wek)
  var weekday = {
    label: wek.weekday + " (" + wek.businessDate + ")",
    value: value,
    disabled: true,
  };
  option.splice(option.length, 0, weekday);
}
function autoInto(matchInfoList) {
  if (matchInfoList == undefined) {
  } else {
    for (var i = 0; i < matchInfoList.length; i++) {
      var subMatchList = matchInfoList[i].subMatchList;
      var weekValue = "week" + "" + i;
      getWeek(matchInfoList[i], weekValue);
      selectOpGet(subMatchList, weekValue);
    }
  }
}
async function GetData() {
  let data;
  await axios
    .get(
      "https://webapi.sporttery.cn/gateway/jc/football/getMatchCalculatorV1.qry?poolCode=ttg&channel=c"
    )
    .then((res) => {
      data = JSON.stringify(res);
      if (res.data.value.matchInfoList) {
      } else {
        data = true;
      }
    })
    .catch((err) => {
      alert("比赛列表获取失败:" + err);
      data = true;
    });
  return data;
}
GetData().then((dataArr) => {
  if (dataArr == true) {
    option.splice(0, 1);
  } else {
    // console.log(dataArr);
    dataArr = JSON.parse(dataArr);
    let matchInfoList = dataArr.data.value.matchInfoList;
    updateTime.value = dataArr.data.value.lastUpdateTime;
    autoInto(matchInfoList);
  }
});
const handleUpdateValue = (value, ttg) => {
  var giveValue = ttg.ttg;
  valueOne.value = parseFloat(giveValue.s0);
  valueTwo.value = parseFloat(giveValue.s1);
  valueThree.value = parseFloat(giveValue.s2);
  valueFour.value = parseFloat(giveValue.s3);
  valueFive.value = parseFloat(giveValue.s4);
  valueSix.value = parseFloat(giveValue.s5);
  valueSeven.value = parseFloat(giveValue.s6);
  valueEight.value = parseFloat(giveValue.s7);
  value == "none" ? (disabled.value = false) : (disabled.value = true);
};

const Unlock = () => {
  if (disabled.value) {
    dialog.warning({
      title: "提示",
      content: "现在是锁定状态 是否解锁输入框内容？",
      positiveText: "是",
      negativeText: "否",
      onPositiveClick: () => {
        message.success("解锁成功");
        disabled.value ? (disabled.value = false) : (disabled.value = true);
      },
      onNegativeClick: () => {
        message.error("已取消");
      },
    });
  }
};
const PromptBack = () => {
  valueOneBackS.value = "none";
  valueTwoBackS.value = "none";
  valueThreeBackS.value = "none";
  valueFourBackS.value = "none";
  valueFiveBackS.value = "none";
  valueSixBackS.value = "none";
  valueSevenBackS.value = "none";
  valueEightBackS.value = "none";
};

const statusChecking = () => {
  inputValidation.value = "none";
};

function compute() {
  principal.value = Math.trunc(principal.value);
  if (principal.value % 2 != 0) {
    principal.value = principal.value - 1;
  }
  // 点击按钮开始 首先将input中获取的数值根据顺序放入数组
  let countArr = [
    valueOne.value,
    valueTwo.value,
    valueThree.value,
    valueFour.value,
    valueFive.value,
    valueSix.value,
    valueSeven.value,
    valueEight.value,
  ];
  // 深拷贝一份初始的countArr用于比较
  let tempArrOdds = JSON.stringify(countArr);
  let oddsArr = JSON.parse(tempArrOdds);
  let y = oddsArr.indexOf(null);
  // 验证数组中每一项数值不为空 若为空则break循环
  if (y == -1) {
    var status = 0;
  } else {
    var status = 1;
    let eI = EmptyInputGet(y);
    eI.value = "error";
    let erroToShake = ShakeModle(y);
    erroToShake.value = "apply-shake";
    setTimeout(() => {
      erroToShake.value = "none";
    }, 820);
  }
  if (!principal.value) {
    inputValidation.value = "error";
    inputValidationShake.value = "apply-shake";
    setTimeout(() => {
      inputValidationShake.value = "none";
    }, 820);
    var status = 1;
  } else if (status == 1) {
    var status = 1;
  } else {
    var status = 0;
  }
  // 若↑↑↑循环break则不会执行以下代码
  if (status == 0) {
    let tempPel = principal.value;
    if (tempPel >= 16) {
      // function①
      // 如果input数值不为空则开始进行基础运算
      tempPel = tempPel / 2;
      // 获取关键值
      let firstOdds = Math.min.apply(null, oddsArr);
      oddsArr.splice(oddsArr.indexOf(firstOdds), 1);
      let secondOdds = Math.min.apply(null, oddsArr);
      oddsArr.splice(oddsArr.indexOf(secondOdds), 1);
      //获取下标 设置Positioned
      let fin = "Positioned";
      let firstIndex = countArr.findIndex((value) => value == firstOdds);
      countArr.splice(firstIndex, 1, fin);
      let secondIndex = countArr.findIndex((value) => value == secondOdds);
      countArr.splice(secondIndex, 1, fin);
      //根据下标 得到对应进球数信息

      var firstBack = JudgementSubscript(firstIndex);
      var secondBack = JudgementSubscript(secondIndex);

      // 保底金额
      var tempPelChecking = tempPel;

      if (firstOdds + secondOdds < 3.5) {
        tempPelChecking = tempPel / 1.8;
        var tempAdd1 = tempPelChecking / firstOdds;
        var tempAdd2 = tempPelChecking / secondOdds;
      } else {
        var tempAdd1 = tempPel / firstOdds;
        var tempAdd2 = tempPel / secondOdds;
      }

      let principalMG = tempPelChecking * 0.07;
      principalMG = tempAdd1 + tempAdd2 + principalMG;
      let MinimumGuarantee = parseInt(principalMG);
      //计算赔率最低的两个组合的占比
      let denominator = secondOdds + firstOdds;
      firstBack.value = parseInt((secondOdds / denominator) * MinimumGuarantee);
      let v1 = parseInt((secondOdds / denominator) * MinimumGuarantee);

      //↓↓↓↓分别投入60%与这两项计算出投入金额
      secondBack.value = MinimumGuarantee - firstBack.value;
      let v2 = MinimumGuarantee - firstBack.value;
      tempPel = tempPel - v1 - v2;
      //console.log("tempPel:" + tempPel);
      // 二次分流
      tempPel = parseInt(tempPel * 0.86);

      // 获取关键值
      let thirdOdds = Math.min.apply(null, oddsArr);
      oddsArr.splice(oddsArr.indexOf(thirdOdds), 1);
      let fourthOdds = Math.min.apply(null, oddsArr);
      oddsArr.splice(oddsArr.indexOf(fourthOdds), 1);
      //获取下标 设置Positioned
      let thirdIndex = countArr.findIndex((value) => value == thirdOdds);
      countArr.splice(thirdIndex, 1, fin);
      let fourthIndex = countArr.findIndex((value) => value == fourthOdds);
      countArr.splice(fourthIndex, 1, fin);

      //根据下标 得到对应进球数信息
      var thirdBack = JudgementSubscript(thirdIndex);
      var fourthBack = JudgementSubscript(fourthIndex);

      //计算赔率最低的两个组合的占比
      denominator = thirdOdds + fourthOdds;
      thirdBack.value = parseInt((fourthOdds / denominator) * tempPel);
      var b3 = parseInt((fourthOdds / denominator) * tempPel);
      //↓↓↓↓分别投入60%与这两项计算出投入金额
      thirdBack.value % 2 == 0 ? thirdBack.value : thirdBack.value--;
      // 判断若都为亏损则反转投注金额使赔率略高的一项略微盈利
      if (
        tempPel - thirdBack.value * fourthOdds >= principal.value ||
        thirdBack.value * thirdOdds >= principal.value
      ) {
        fourthBack.value = tempPel - thirdBack.value;
        var b3 = tempPel - thirdBack.value;
      } else {
        fourthBack.value = thirdBack.value;
        var b3 = thirdBack.value;
        thirdBack.value = tempPel - thirdBack.value;
        var b4 = tempPel - thirdBack.value;
      }
      let lowPel = principal.value / 2 - tempPel - v1 - v2;
      // 获取关键值
      let fiveOdds = Math.min.apply(null, oddsArr);
      oddsArr.splice(oddsArr.indexOf(fiveOdds), 1);
      let sixOdds = Math.min.apply(null, oddsArr);
      oddsArr.splice(oddsArr.indexOf(sixOdds), 1);
      let sevenOdds = Math.min.apply(null, oddsArr);
      oddsArr.splice(oddsArr.indexOf(sevenOdds), 1);
      let eightOdds = Math.min.apply(null, oddsArr);
      oddsArr.splice(oddsArr.indexOf(eightOdds), 1);
      // 获取下标
      let fiveIndex = countArr.findIndex((value) => value == fiveOdds);
      countArr.splice(fiveIndex, 1, fin);
      let sixIndex = countArr.findIndex((value) => value == sixOdds);
      countArr.splice(sixIndex, 1, fin);
      let sevenIndex = countArr.findIndex((value) => value == sevenOdds);
      countArr.splice(sevenIndex, 1, fin);
      let eightIndex = countArr.findIndex((value) => value == eightOdds);
      countArr.splice(eightIndex, 1, fin);
      //分配
      denominator = fiveOdds + sixOdds + sevenOdds + eightOdds;
      let d5 = (fiveOdds / denominator) * lowPel;
      let d6 = (sixOdds / denominator) * lowPel;
      let d7 = (sevenOdds / denominator) * lowPel;
      let d8 = lowPel - d5 - d6 - d7;
      let fiveBack = JudgementSubscript(fiveIndex);
      let sixBack = JudgementSubscript(sixIndex);
      let sevenBack = JudgementSubscript(sevenIndex);
      let eightBack = JudgementSubscript(eightIndex);
      fiveBack.value = parseInt(d5);
      sixBack.value = parseInt(d6);
      sevenBack.value = parseInt(d7);
      eightBack.value = parseInt(d8);

      let erroValue =
        principal.value / 2 -
        valueOneBack.value -
        valueTwoBack.value -
        valueThreeBack.value -
        valueFourBack.value -
        valueFiveBack.value -
        valueSixBack.value -
        valueSevenBack.value -
        valueEightBack.value;
      eightBack.value = valueEightBack.value + erroValue;

      let backValueArr = [
        valueOneBack.value,
        valueTwoBack.value,
        valueThreeBack.value,
        valueFourBack.value,
        valueFiveBack.value,
        valueSixBack.value,
        valueSevenBack.value,
        valueEightBack.value,
      ];

      function verifyValuRatio(backValueArr) {
        var i = 0;
        var ant = false;
        for (i; i < backValueArr.length; i++) {
          // console.log();
          if (backValueArr[i] <= 0) {
            ant = true;
          }
        }
        // console.log(i);
        if (ant) {
          return false;
        } else {
          return true;
        }
      }
      let verifyValuRatioReturn = verifyValuRatio(backValueArr);
      if (!verifyValuRatioReturn) {
        message.error("赔率或投入金额过小");
        inputValidation.value = "error";
        for (let i = 0; i < 8; i++) {
          // console.log(i)
          let tempV = JudgementSubscript(i);
          tempV.value = 0;
        }
      } else {
        message.success("计算成功!");
      }
    }
  }
  TableData.value = [];
  for (let i = 0; i < 8; i++) {
    let mainData = JudgementSubscript(i);
    let subsidiaryData = AcquireMagnification(i);
    let tempArr = {
      NumberOfGoals: i,
      ExpectedInput: mainData.value,
      AmountInvested: mainData.value * 2,
      ExpectedReturn: Math.round(mainData.value * 2 * subsidiaryData.value),
    };
    TableData.value.splice(i, 0, tempArr);
  }
  var IsSuitableForPurchase = 0;
  for (let i = 0; i < 8; i++) {
    if (TableData.value[i].ExpectedReturn >= principal.value) {
      var IsSuitableForPurchase = IsSuitableForPurchase + 1;
    }
  }
  setTimeout(() => {
    if (valueOneBack.value <= 0) {
      IsSuitableForPurchase = 9;
    }
    if (IsSuitableForPurchase <= 8 && IsSuitableForPurchase >= 3) {
      message.success("本场收益高 适合购买");
    } else if (IsSuitableForPurchase <= 1) {
      message.warning("本场收益低 不适合购买");
    } else if (IsSuitableForPurchase === 2) {
      message.info("购买本场收益适中");
    } else if (IsSuitableForPurchase === 9) {
    }
  }, 700);
}

const handleGet = () => {
  compute();
};
const columns = [
  {
    title: "进球数",
    key: "NumberOfGoals",
  },
  {
    title: "预期投入 股",
    key: "ExpectedInput",
  },
  {
    title: "投入金额 ￥",
    key: "AmountInvested",
  },
  {
    title: "预期回报 ￥",
    key: "ExpectedReturn",
  },
];
</script>

<template>
  <!-- h头 -->
  <n-layout>
    <n-layout-header id="totalGoals"
      >总进球数
      <span class="totalGoalsTitle" style="color: #999; font-size: 14px"
        >单场总进球数(过关方式:单关)</span
      ></n-layout-header
    >
    <n-layout-content content-style="padding: 24px;">
      <h5>
        <span class="updateTime"> 更新时间: {{ updateTime }} </span>
        <span class="fromUrl">数据来源:sporttery.cn</span>
      </h5>
      <n-popover trigger="hover">
        <template #trigger>
          <n-select
            id="nogisTitle"
            placeholder="请选择比赛"
            v-model:value="value"
            :options="option"
            class="rightBtn"
            @update:value="handleUpdateValue"
          />
        </template>
        若需要手动设置倍率可以在选择器中选择自定义
      </n-popover>
      <span class="inputFormat">进球数:赔率</span>
      <span class="lockSwitch">
        <n-popover trigger="hover">
          <template #trigger>
            <span>锁定编辑 : </span>
          </template>
          <span>为防止误操作 当你选择比赛后默认锁定</span>
        </n-popover>
        <n-switch v-model:value="disabled" size="small" />
      </span>
      <n-grid cols="4" item-responsive>
        <n-grid-item span="4 400:4 600:2 800:1" id="ignore-gap">
          <div class="interval">
            <n-input-number
              :disabled="disabled"
              :precision="2"
              :status="valueOneBackS"
              :class="valueOneBackShake"
              v-model:value="valueOne"
              placeholder="赔率"
              :min="1.3"
              :max="999"
              @click="Unlock"
              @input="PromptBack"
            >
              <!-- 通常情况下赔率在1.30~1.80之间 -->
              <template #prefix>
                <span class="inputTitle">0球:</span>
              </template>
            </n-input-number>
          </div>
        </n-grid-item>
        <n-grid-item span="4 400:4 600:2 800:1">
          <div class="interval">
            <n-input-number
              :disabled="disabled"
              :precision="2"
              :status="valueTwoBackS"
              :class="valueTwoBackShake"
              v-model:value="valueTwo"
              placeholder="赔率"
              :min="1.3"
              :max="999"
              @click="Unlock"
              @input="PromptBack"
            >
              <template #prefix
                ><span class="inputTitle">1球:</span></template
              >
            </n-input-number>
          </div> </n-grid-item
        ><n-grid-item span="4 400:4 600:2 800:1">
          <div class="interval">
            <n-input-number
              :disabled="disabled"
              :class="valueThreeBackShake"
              :precision="2"
              :status="valueThreeBackS"
              v-model:value="valueThree"
              placeholder="赔率"
              :min="1.3"
              :max="999"
              @click="Unlock"
              @input="PromptBack"
            >
              <template #prefix
                ><span class="inputTitle">2球:</span></template
              >
            </n-input-number>
          </div> </n-grid-item
        ><n-grid-item span="4 400:4 600:2 800:1">
          <div class="interval">
            <n-input-number
              :disabled="disabled"
              :precision="2"
              :status="valueFourBackS"
              :class="valueFourBackShake"
              v-model:value="valueFour"
              placeholder="赔率"
              :min="1.3"
              :max="999"
              @click="Unlock"
              @input="PromptBack"
            >
              <template #prefix
                ><span class="inputTitle">3球:</span></template
              >
            </n-input-number>
          </div> </n-grid-item
        ><n-grid-item span="4 400:4 600:2 800:1">
          <div class="interval">
            <n-input-number
              :disabled="disabled"
              :precision="2"
              :status="valueFiveBackS"
              :class="valueFiveBackShake"
              v-model:value="valueFive"
              placeholder="赔率"
              :min="1.3"
              :max="999"
              @click="Unlock"
              @input="PromptBack"
            >
              <template #prefix
                ><span class="inputTitle">4球:</span></template
              >
            </n-input-number>
          </div> </n-grid-item
        ><n-grid-item span="4 400:4 600:2 800:1">
          <div class="interval">
            <n-input-number
              :disabled="disabled"
              :precision="2"
              :status="valueSixBackS"
              :class="valueSixBackShake"
              v-model:value="valueSix"
              placeholder="赔率"
              :min="1.3"
              :max="999"
              @click="Unlock"
              @input="PromptBack"
            >
              <template #prefix
                ><span class="inputTitle">5球:</span></template
              >
            </n-input-number>
          </div> </n-grid-item
        ><n-grid-item span="4 400:4 600:2 800:1">
          <div class="interval">
            <n-input-number
              :disabled="disabled"
              :precision="2"
              :status="valueSevenBackS"
              :class="valueSevenBackShake"
              v-model:value="valueSeven"
              placeholder="赔率"
              :min="1.3"
              :max="999"
              @click="Unlock"
              @input="PromptBack"
            >
              <template #prefix
                ><span class="inputTitle">6球:</span></template
              >
            </n-input-number>
          </div> </n-grid-item
        ><n-grid-item span="4 400:4 600:2 800:1">
          <div class="interval">
            <n-input-number
              :disabled="disabled"
              :precision="2"
              :status="valueEightBackS"
              :class="valueEightBackShake"
              v-model:value="valueEight"
              placeholder="赔率"
              :min="1.3"
              :max="999"
              @click="Unlock"
              @input="PromptBack"
            >
              <template #prefix
                ><span class="inputTitle">7+球:</span></template
              >
            </n-input-number>
          </div>
        </n-grid-item>
      </n-grid>
      <div class="interval yuanIcon" id="affix">
        <n-input-number
          :precision="2"
          v-model:value="principal"
          placeholder="预计投入"
          :status="inputValidation"
          :class="inputValidationShake"
          :min="16"
          :max="99999999999"
          @input="statusChecking"
          @keyup.enter="handleGet"
        >
          <template #prefix>￥</template>
        </n-input-number>
      </div>
      <div class="btnBox">
        <n-button
          class="startBtn"
          type="success"
          id="getBtn"
          @click="handleGet"
        >
          开始计算
        </n-button>

        <n-grid cols="24" item-responsive>
          <n-grid-item span="24 400:24 600:0 800:0">
            <n-data-table
              :columns="columns"
              :data="TableData"
              :row-props="rowProps"
            />
          </n-grid-item>
          <n-grid-item span="0 400:0 600:24 800:24">
            <n-table :bordered="false" :single-line="false">
              <thead>
                <tr>
                  <th>进球数</th>
                  <th>预期投入 股</th>
                  <th>投入金额 ￥</th>
                  <th>预期回报 ￥</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="tableLine1">0</td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueOneBack"
                    />
                    股
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueOneBack * 2"
                    />￥
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="Math.round(valueOneBack * 2 * valueOne)"
                    />￥
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueTwoBack"
                    />
                    股
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueTwoBack * 2"
                    />
                    ￥
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="Math.round(valueTwoBack * 2 * valueTwo)"
                    />
                    ￥
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueThreeBack"
                    />
                    股
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueThreeBack * 2"
                    />
                    ￥
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="Math.round(valueThreeBack * 2 * valueThree)"
                    />
                    ￥
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueFourBack"
                    />
                    股
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueFourBack * 2"
                    />
                    ￥
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="Math.round(valueFourBack * 2 * valueFour)"
                    />
                    ￥
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueFiveBack"
                    />
                    股
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueFiveBack * 2"
                    />
                    ￥
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="Math.round(valueFiveBack * 2 * valueFive)"
                    />￥
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueSixBack"
                    />股
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueSixBack * 2"
                    />
                    ￥
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="Math.round(valueSixBack * 2 * valueSix)"
                    />￥
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueSevenBack"
                    />
                    股
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueSevenBack * 2"
                    />￥
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="Math.round(valueSevenBack * 2 * valueSeven)"
                    />￥
                  </td>
                </tr>
                <tr>
                  <td>7+</td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueEightBack"
                    />
                    股
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="valueEightBack * 2"
                    />
                    ￥
                  </td>
                  <td>
                    <n-number-animation
                      ref="numberAnimationInstRef"
                      :from="0"
                      show-separator
                      :to="Math.round(valueEightBack * 2 * valueEight)"
                    />
                    ￥
                  </td>
                </tr>
              </tbody>
            </n-table>
            <div class="footBox">
              <span class="ToUrl">更多赛程请关注: </span>
              <a target="_blank" href="https://www.sporttery.cn/jc/zqszsc/"
                >www.sporttery.cn/jc/zqszsc/</a
              >
            </div>
          </n-grid-item>
        </n-grid>
      </div>
    </n-layout-content>
  </n-layout>
  <!-- h尾 -->
</template>
