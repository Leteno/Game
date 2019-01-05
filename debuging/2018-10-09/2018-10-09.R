install.packages("zoo")
install.packages("tseries")
install.packages("Kendall")
install.packages("pracma")
install.packages("outliers")
install.packages("forecast")
library(zoo)
library(tseries)
library(Kendall)
library(pracma)
library(outliers)
library(forecast)

data<- read.csv("Amazon_Daily.csv", header=TRUE)[,"Close"]
data=na.locf(data)
sum(is.na(data))
head(data)
stockprice<- ts(data)

plot(stockprice, type="l", main="Close Prices of Amazon", xlab="Year", ylab="Close Prices($)")

diff_original<- diff(stockprice, lag = 1)
log_stockprice<- log(stockprice)
diff_log<- diff(log_stockprice)
sqrt_stockprice<- sqrt(stockprice)
diff_sqrt<- diff(stockprice)
par(mfrow=c(3,1))
plot(diff_original, main="First Degree Differencing On Raw Data")
plot(diff_log, main="First Degree Differencing On Log-Transformed Data")

plot(diff_sqrt, main="First Degree Differencing On Square-Root-Transformed Data")

out_log<-rm.outlier(diff_log)
diffback<- diffinv(out_log, lag=1, differences = 1 ,log_stockprice[1])
diffback_ts<- ts(diffback)

boxplot(diffback)

print(adf.test(log_stockprice))
print(MannKendall(log_stockprice))
print(adf.test(diffback_ts))
print(MannKendall(diffback_ts))

decompose(diffback_ts)

checkresiduals(diffback)

#Naive
breakpoint=504
actural_series<- data.frame(Actual= numeric())
forecasted_series<- data.frame(Forecasted= numeric())
for (b in seq(breakpoint, length(diff_log),1)) {
  training_rolling<- diff_log[1:b]
  test_rolling<- diff_log[1+b:length(diff_log)]
  naive_rolling<- naive(training_rolling, h=1)
  #print(naive_rolling)
  naive_rolling_forecast<- forecast(naive_rolling, h=1)
  #summary(naive_rolling_forecast)
  plot(naive_rolling_forecast, main = "Naive Forecast")
  colnames(forecasted_series)= c("Forecasted")
  forecasted_series=rbind(forecasted_series, naive_rolling_forecast$mean[1])
  actual_return<- data.frame(diff_log[(b+1)])
  colnames(actual_return)<- c("Actual")
  actual_series<- rbind(actural_series, actual_return[1])
  rm(actual_return)
}
actual_series<- diff_log[(breakpoint+1):length(diff_log)]  
plot(actual_series,type="l", main="Forecasted Series VS Actual Series", ylab = "Stock Proce($)",xlab="2016" ) 
lines(forecasted_series,col="red")
legend("topleft",legend = c("Actual Series","Forecasted Series"),col=c("black","red"),lty = 1)
checkresiduals(naive_rolling_forecast)

accuracy(ts(forecasted_series), actual_series)

#EXPONENTIAL
breakpoint= 504
actual_series<- data.frame(Actual= numeric())
forecasted_series<- data.frame(Forecasted= numeric())
for (b in seq(breakpoint, length(diff_log),1)) {
  train_amazon<- diff_log[1:b]
  ses_amazon<- ses(train_amazon,h=1)
  test_amazon<- diff_log[1+b:length(diff_log)]
  plot(ses_amazon,main="Exponentially Forecasting Method")
  colnames(forecasted_series)=c("Forecasted")
  forecasted_series=rbind(forecasted_series, ses_amazon$mean[1])
  actual_return<- data.frame(diff_log[(b+1)])
  colnames(actual_return)<- c("Actual")
  actual_series<- rbind(actual_series, actual_return[1])
  rm(actual_return)
}

actual_series<- diff_log[(breakpoint+1):length(diff_log)]
plot(actual_series, type="l", main="Forecasted Series VS Actual Series", ylab="Stock Price($)",xlab="2016")
lines(forecasted_series,col="red")
legend("topleft", legend=c("Actual Series", "Forecasted Series"), col=c("black","red"), lty=1)

accuracy(ts(forecasted_series),actual_series)


#ARIMA
breakpoint=1000

par(mfrow=c(2,1))
acf_stockprice<- acf(diffback[c(1:breakpoint)], main="ACF Plot", lag.max = 100)
pacf_stockprice<- pacf(diffback[c(1:breakpoint)], main="PACF Plot", lag.max = 100)

arima<- auto.arima(out_log)
par(mfrow=c(1,1))
acf(arima$residuals, main="Residuals ACF Plot")

plot(forecast(arima, h=365, level=99), main="ARIMA Forecast", xlab="time", ylab="log(stock price)")

date<-seq(as.Date("2018-08-16"), as.Date("2019-08-15"),by="day")

data_frame<- data.frame(data)

forecasted_series<- data.frame(Forecasted=numeric())
actual_series <- data.frame(Actual=numeric())
for(b in seq(breakpoint, nrow(data_frame),7)){
  stockprice_train<- diffback[1:b]
  stockprice_test<- diffback[(b+1):nrow(data_frame)]
  fit_arima<- auto.arima(stockprice_train,max.P = 0,max.Q = 0,max.D = 0)
  print(fit_arima)
  
  acf(fit_arima$residuals, main="Residuals ACF Plot")
  
  arima_forecast<- forecast(fit_arima, h=7, level=99)
  summary(arima_forecast)
  plot(arima_forecast,main="ARIMA Forecast")
  
  colnames(forecasted_series)<- c("Forecasted")
  forecasted_series<- rbind(forecasted_series, arima_forecast$mean[1])
  forecasted_series<- rbind(forecasted_series, arima_forecast$mean[2])
  forecasted_series<- rbind(forecasted_series, arima_forecast$mean[3])
  forecasted_series<- rbind(forecasted_series, arima_forecast$mean[4])
  forecasted_series<- rbind(forecasted_series, arima_forecast$mean[5])
  forecasted_series<- rbind(forecasted_series, arima_forecast$mean[6])
  forecasted_series<- rbind(forecasted_series, arima_forecast$mean[7])
  
  actual_return<- diffback[(b+1):(b+8)]
  colnames(actual_series)<- c("Actual")
  actual_series<- rbind(actual_series, actual_return[1])
  actual_series<- rbind(actual_series, actual_return[2])
  actual_series<- rbind(actual_series, actual_return[3])
  actual_series<- rbind(actual_series, actual_return[4])
  actual_series<- rbind(actual_series, actual_return[5])
  actual_series<- rbind(actual_series, actual_return[6])
  actual_series<- rbind(actual_series, actual_return[7])
  rm(actual_return)
}

plot(actual_series[,1], type="l") 
lines(forecasted_series[,1], type = "l", col="red", main="Forecasted Series vs Actual Series", ylab="log(stock price)")

actual_value <- exp(actual_series)
forecasted_value <- exp(forecasted_series)
plot(actual_value[,1], type="l") 
lines(forecasted_value[,1], type = "l", col="red", main="Forecasted Series vs Actual Series", ylab="log(stock price)")
